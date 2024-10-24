import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import { ErrorLogService } from '@/src/services/errorLog.service';
import { mockData } from '@/src/assets/data/mockData';
import { eGmatHeaders, gmatWhizHeaders, TemplateId, testPrepHeaders } from '@/src/utils/constants';
import { sendErrorDataToBackend } from '@/src/utils/helper';
import FileUpload from '@/src/components/fileUpload';
import AppButton from '@/src/components/appButton';
import { useTheme } from '@/src/constants/themeContext';
import { errorMapper } from '@/src/utils/mapper';
import { resetChart } from '@/src/redux/Reducer/chartDataReducer';
import * as XLSX from 'xlsx';

interface ISelectedFileDetails {
  file?: any;
  fileType?: string;
  fileTemplate?: string;
  fileData?: any;
}

const Analyser = () => {
  const { width } = useWindowDimensions();
  const matches = width >= 800;
  const ErrorLogApis = new ErrorLogService();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [files, setFiles] = useState<any[]>([]);
  const [analysed, setAnalysed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState<boolean>(false);
  const [percent, setPercent] = useState(0);
  const intervalref = useRef<any>(null);
  const workerRef = useRef<any>(null);
  const [parsedFiles, setParsedFiles] = useState<ISelectedFileDetails[]>([]);
  const [analyzedData, setAnalyzedData] = useState([]);
  const [summary, setSummary] = useState(mockData);

  const tableHeader = useMemo(() => {
    switch (parsedFiles?.[0]?.fileTemplate) {
      case 'gmatwhiz':
        return gmatWhizHeaders;
      case 'e-gmat':
        return eGmatHeaders;
      case 'targettestprep':
        return testPrepHeaders;
      default:
        return [];
    }
  }, [analyzedData]);

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleOnSave = async () => {
    let jobId = '';
    try {
      jobId = await sendErrorDataToBackend(analyzedData, ErrorLogApis);
    } catch (error) {
      console.error(error);
    }
    return jobId;
  };

  const identifySource = (inputText: string) => {
    const patterns = {
      'e-gmat': /^\d+\s+[A-Z]{2,3}\s+[\w\s]+\s+[E|EM]\s+\[x?\]\s+\d{2}:\d{2}/m,
      targettestprep: /[@|©]\s*Question\d+\s+PROBLEM SOLVING/,
      gmatwhiz: /^\d+\s+\d{3}-\d{3}\s+Level\s+\d{1,3}:\d{2}\s+MM:SS/m,
    };

    for (let [source, pattern] of Object.entries(patterns)) {
      if (pattern.test(inputText)) {
        return source;
      }
    }

    return 'Unknown source';
  };

  const convertImageToText = async (imageUri: string, added = false) => {
    if (!workerRef.current) {
      // workerRef.current = new TesseractWorker();
    }

    try {
      const result = await workerRef.current.recognize(imageUri, {
        lang: 'eng',
        ...(added ? {
          tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:()+-=/%@© '
        } : {})
      });

      return {
        data: result.text,
        source: identifySource(result.text),
        image: imageUri
      };
    } catch (error) {
      console.error('OCR Error:', error);
      return { data: '', source: 'Unknown', image: imageUri };
    }
  };

  const preProcessImage = async (imageUri: string, template: TemplateId) => {
    try {
      let actions = [];
      switch (template) {
        case TemplateId.GMATWHIZ:
          actions = [
            { resize: { width: 1024 } },
            // { greyscale: true },
            // { contrast: 1.2 },
            // { brightness: 1.2 },
          ];
          break;
        case TemplateId.TESTPREP:
          actions = [
            { resize: { width: 1024 } },
            // { greyscale: true },
            // { contrast: 1.1 },
          ];
          break;
        default:
          return imageUri;
      }

      const result = await ImageManipulator.manipulateAsync(
        imageUri,
        actions,
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );

      return result.uri;
    } catch (error) {
      console.error('Image processing error:', error);
      return imageUri;
    }
  };

  const processExcel = async (fileUri: string): Promise<any> => {
    try {
      const fileData = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });  // Read file as base64
      const binaryString = atob(fileData);  // Convert base64 to binary string
      const workbook = XLSX.read(binaryString, { type: 'binary' });  // Parse binary string
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      return jsonData;
    } catch (error) {
      console.error("Error reading excel file: ", error);
    }
  };


  const handleAnalyze = async () => {
    setLoading(true);
    const jobId = await handleOnSave();
    intervalref.current = setInterval(async () => {
      if (!!jobId) {
        const res = await ErrorLogApis.GetSummary(jobId);
        if (res.data.status === "Completed") {
          setSummary(res.data.message);
          setPercent(100);
        } else if (percent < 90) setPercent((prev) => prev + 5);
      } else if (percent < 90) setPercent((prev) => prev + 5);
    }, 2000);
  };

  const pickFiles = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        multiple: true,
      });

      if (result.assets) {
        setFiles(result.assets);
      }
    } catch (error) {
      console.error('File picking error:', error);
    }
  }, []);

  const fileExtractor = async (file: any) => {
    const isImage = file.mimeType.includes('image');
    if (isImage) {
      const { data, source } = await convertImageToText(file.uri);
      return { type: 'image', data: [data], source };
    } else {
      return { type: 'excel', data: await processExcel(file.uri), source: 'GMAT' };
    }
  };

  const onAnalyze = async (acceptedFiles: File[]) => {
    try {
      setFileLoading(true);
      const parsedData: ISelectedFileDetails[] = await Promise.all(
        acceptedFiles.map(async (each: File) => {
          const { data, source, type } = await fileExtractor(each);
          return {
            file: each,
            fileType: type,
            fileTemplate: source,
            fileData: data,
          };
        })
      );
      setParsedFiles([...parsedData]);
      const filteredData: ISelectedFileDetails[] = parsedData.filter(
        (each) =>
          each.fileType === parsedData?.[0]?.fileType &&
          each.fileTemplate === parsedData?.[0]?.fileTemplate
      );
      const newParsed = (
        await Promise.all(
          filteredData.map(async (x) => {
            if (x.fileType === "excel") {
              return errorMapper(x.fileData, TemplateId.GMATClub);
            } else if (x.fileTemplate === "e-gmat") {
              return errorMapper(x.fileData as string[], TemplateId.EGMAT);
            } else if (x.fileTemplate === "targettestprep") {
              const processedFile: any = await preProcessImage(
                x.file as string,
                TemplateId.TESTPREP
              );
              const fileData = await convertImageToText(processedFile, true);
              return errorMapper([fileData.data], TemplateId.TESTPREP);
            } else if (x.fileTemplate === "gmatwhiz") {
              const processedFile: any = await preProcessImage(
                x.file as string,
                TemplateId.GMATWHIZ
              );
              const fileData = await convertImageToText(processedFile);
              return errorMapper([fileData.data], TemplateId.GMATWHIZ);
            }
            return [];
          })
        )
      ).reduce((all, each) => [...all, ...each], []);
      setAnalyzedData(newParsed);
      setFileLoading(false);
      return newParsed;
    } catch (error) {
      console.error("Error in onAnalyse", error)
    }
  };


  useEffect(() => {
    if (percent === 100) {
      setTimeout(() => {
        setLoading(false);
        setAnalysed(true);
        clearInterval(intervalref.current as NodeJS.Timeout);
        intervalref.current = null;
      }, 1000);
      dispatch(resetChart());
    }
  }, [percent, dispatch]);

  useEffect(() => {
    return () => {
      workerRef?.current?.terminate();
    };
  }, []);

  useEffect(() => {
    if (files.length) onAnalyze(files);
    else {
      setParsedFiles([]);
      setAnalyzedData([]);
    }
  }, [files]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor3,
    },
    contentContainer: {
      padding: 20,
      alignItems: 'center',
    },
    mainContent: {
      width: '100%',
      maxWidth: 600,
      gap: 20,
    },
    topContainer: {
      gap: 10,
    },
    header: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.textColor1
    },
    hint: {
      color: theme.placeholder,
      fontSize: 14,
    },
    fileList: {
      padding: 10,
      gap: 10,
    },
    fileItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 20,
      gap: 10,
    },
    fileInfo: {
      flex: 1,
    },
    downContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    analyzeButton: {
      backgroundColor: '#f0f0f0',
      opacity: 0.5,
      width: 150
    },
    activeButton: {
      backgroundColor: '#007AFF',
    },
    viewMode: {
      height: '100%',
      justifyContent: 'flex-start',
    },
    loader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255,255,255,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fileName: {
      color: theme.textColor1,
      fontSize: 14,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.contentContainer, analysed && styles.viewMode]}>
        {!analysed ? (
          <View style={styles.mainContent}>
            <View style={styles.topContainer}>
              <Text style={styles.header}>Analyse Error Log</Text>
              <Text style={styles.hint}>
                Get instant analysis to help you move forward in your study.
              </Text>

              {files.length > 0 ? (
                <View style={[styles.fileList, { width: matches ? 300 : '100%' }]}>
                  {files.map((file, index) => (
                    <View key={index} style={styles.fileItem}>
                      <MaterialCommunityIcons name="file-document" size={24} color="#666" />
                      <View style={styles.fileInfo}>
                        <Text style={styles.fileName} numberOfLines={1}>{file.name}</Text>
                      </View>
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={24}
                        color="#666"
                        onPress={() => handleRemoveFile(index)}
                      />
                    </View>
                  ))}
                </View>
              ) : (
                <FileUpload
                  onFilesSelected={pickFiles}
                  width={matches ? 300 : '100%'}
                  height={200}
                  innerFiles={false}
                  multiple={true}
                  accept={['image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']}
                />
              )}
            </View>

            <View style={styles.downContainer}>
              <Text style={styles.hint}>
                {parsedFiles.length
                  ? `${parsedFiles[0]?.fileTemplate} template is chosen`
                  : ''}
              </Text>
              <AppButton
                onPress={handleAnalyze}
                label="Analyze"
                disabled={!files.length}
                style={!files.length ? styles.analyzeButton : { width: 150 }}
              />
            </View>
            <Text >{JSON.stringify(analyzedData)}</Text>

            {loading && (
              <View style={styles.loader}>
                <ActivityIndicator size="large" />
                <Text>{`${percent}%`}</Text>
              </View>
            )}
          </View>
        ) : (
          // <AnalyseView data={{ ...summary, file: files[0] }} />
          <Text>analyzed</Text>
        )}
      </View>
    </ScrollView>
  );
};


export default Analyser;
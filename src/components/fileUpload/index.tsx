import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useTheme } from '@/src/constants/themeContext';

interface FileInfo {
    name: string;
    uri: string;
    type: string;
    size: number;
}

interface IProps {
    onFilesSelected: (files: FileInfo[]) => void;
    width?: number | string;
    height?: number | string;
    accept?: string[];
    innerFiles?: boolean;
    files?: FileInfo[];
    containerStyle?: object;
    multiple?: boolean;
}

const FileUpload: React.FC<IProps> = ({
    onFilesSelected,
    width = '100%',
    height = 200,
    innerFiles = true,
    files: oldFiles,
    containerStyle,
    accept = ['image/*'],
    multiple = false,
}) => {
    const [files, setFiles] = useState<FileInfo[]>(oldFiles ?? []);
    const { theme } = useTheme();

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: accept,
                multiple,
                copyToCacheDirectory: true,
            });

            if (result.assets) {
                const newFiles = result.assets.map(asset => ({
                    name: asset.name,
                    uri: asset.uri,
                    type: asset.mimeType || 'application/octet-stream',
                    size: asset.size || 0,
                }));

                setFiles(prevFiles => [...prevFiles, ...newFiles]);
            }
        } catch (err) {
            console.error('Error picking document:', err);
        }
    };

    const handleRemoveFile = (index: number) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (files.length) onFilesSelected(files);
    }, [files, onFilesSelected]);

    const styles = StyleSheet.create({
        container: {
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 20,
            overflow: 'hidden',
        },
        uploadBox: {
            flex: 1,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        uploadInfo: {
            alignItems: 'center',
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
            marginTop: 20,
            width: '100%',
            gap: 10,
        },
        fileItem: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 20,
            padding: 10,
        },
        fileInfo: {
            flex: 1,
            marginRight: 10,
        },
        fileName: {
            color: theme.textColor1,
            fontSize: 14,
        },
        fileActions: {
            padding: 5,
        },
        successFile: {
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
        },
        successText: {
            fontSize: 14,
            color: theme.textColor1,
        },
        textLight: {
            color: theme.textColor1,
        },
    });


    return (
        <View style={[styles.container, { width, height }, containerStyle]}>
            <TouchableOpacity
                style={styles.uploadBox}
                onPress={pickDocument}
            >
                <View style={styles.uploadInfo}>
                    <MaterialCommunityIcons
                        name="cloud-upload-outline"
                        size={40}
                        color={theme.textColor1}
                    />
                    <Text style={styles.header}>
                        Tap to upload
                    </Text>
                    <Text style={styles.hint}>
                        SVG, PNG, JPG or GIF (max. 800x400px)
                    </Text>
                </View>

                {files.length > 0 && innerFiles && (
                    <View style={styles.fileList}>
                        {files.map((file, index) => (
                            <View key={index} style={styles.fileItem}>
                                <View style={styles.fileInfo}>
                                    <Text style={styles.fileName} numberOfLines={1}>
                                        {file.name}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleRemoveFile(index)}
                                    style={styles.fileActions}
                                >
                                    <MaterialCommunityIcons
                                        name="trash-can-outline"
                                        size={24}
                                        color={theme.textColor1}
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}

                {files.length > 0 && innerFiles && (
                    <View style={styles.successFile}>
                        <Text style={styles.successText}>
                            {files.length} file(s) selected
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default FileUpload;
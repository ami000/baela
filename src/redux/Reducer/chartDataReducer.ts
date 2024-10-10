import { createSlice } from '@reduxjs/toolkit';
import { convertDbResultToJson } from '../../utils/mapper';
import { LocalDB } from '../../utils/sql';
import { accuracyChartQuery, categoryChartQuery, diQuery, lastThreeErrorLogQuery, monthsQuery, overallQuery, performanceQuery, quantQuery, subCategoryChartQuery, tmtQuery, totalQuery, verbalQuery, weekyChartQuery } from '../../utils/query';
import { ChartReduxType, DataModelOfChartType } from '../../utils/types';

const initialState: ChartReduxType = {
    total: 0,
    performance: {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: "#EF884A",
                borderColor: "#EF884A",
                borderWidth: 1,
                borderRadius: 5,
            },
        ],
    },
    avgAccuracy: {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: "#EF884A",
                borderColor: "#EF884A",
                borderWidth: 1,
                borderRadius: 5,
            },
        ],
    },
    tmt: {
        labels: [],
        datasets: [],
    },
    overall: [{ name: 1, correct: 0, incorrect: 0 }, { name: 2, correct: 0, incorrect: 0 }],
    verbal: [{ name: 1, correct: 0, incorrect: 0 }, { name: 2, correct: 0, incorrect: 0 }],
    di: [{ name: 1, correct: 0, incorrect: 0 }, { name: 2, correct: 0, incorrect: 0 }],
    quant: [{ name: 1, correct: 0, incorrect: 0 }, { name: 2, correct: 0, incorrect: 0 }],
    weekly: [{ name: 1, correct: 0, incorrect: 0 }, { name: 2, correct: 0, incorrect: 0 }],
    accuracy: [{ name: "Correct", value: 0 }, { name: "Incorrect", value: 0 }],
    categoryAccuracy: [{ name: "Correct", value: 0 }, { name: "Incorrect", value: 0 }],
    subCategoryAccuracy: {},
    lastThreeErrorLog: [],
    monthAccuracy: 0,
    monthSelected: {},
    isAuthenticated: false,
    isReveal: false,
    allMonths: [],
    hasMoreData: true,
    lastPageDetails: {
        page: 0,
        pageSize: 1000,
        dataLength: 0
    }
};

const ChartDataReducer = createSlice({
    name: 'ChartDataReducer',
    initialState,
    reducers: {
        chartData(state: ChartReduxType, payload: any) {
            const isLoggedOut = payload?.payload?.isLoggedOut
            state.hasMoreData = payload?.payload?.hasMoreData || false;
            state.lastPageDetails = payload?.payload?.lastPageDetails || false;
            if (isLoggedOut) {
                state.performance = {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: "#EF884A",
                            borderColor: "#EF884A",
                            borderWidth: 1,
                            borderRadius: 5,
                        },
                    ],
                }
                state.avgAccuracy = {
                    labels: [],
                    datasets: [
                        {
                            label: 'Accuracy',
                            data: [],
                            backgroundColor: 'rgba(255, 165, 89, 0.5)',
                            borderColor: 'rgba(255, 165, 89, 1)',
                            borderWidth: 1,
                        },
                    ],
                }
                state.tmt = {
                    labels: [],
                    datasets: [],
                };
                state.overall = [{ name: 1, correct: 0, incorrect: 0 }, { name: 2, correct: 0, incorrect: 0 }]
                state.verbal = [{ name: 1, correct: 0, incorrect: 0 }, { name: 2, correct: 0, incorrect: 0 }]
                state.di = [{ name: 1, correct: 0, incorrect: 0 }, { name: 2, correct: 0, incorrect: 0 }]
                state.quant = [{ name: 1, correct: 0, incorrect: 0 }, { name: 2, correct: 0, incorrect: 0 }]
                state.weekly = [{ name: 1, correct: 0, incorrect: 0 }, { name: 2, correct: 0, incorrect: 0 }]
                state.accuracy = [{ name: "Correct", value: 0 }, { name: "Incorrect", value: 0 }]
                state.categoryAccuracy = [{ name: "Correct", value: 0 }, { name: "Incorrect", value: 0 }]
                state.subCategoryAccuracy = {}
                state.lastThreeErrorLog = []
                state.monthAccuracy = 0
                state.monthSelected = {}
                state.isAuthenticated = false
                state.isReveal = false
                state.allMonths = []

            } else {

                state.isAuthenticated = payload?.payload?.isAuthenticated

                // Setting Month - Start
                if (!!payload?.payload?.monthSelected)
                    state.monthSelected = payload?.payload?.monthSelected;
                else
                    state.monthSelected = state?.allMonths?.[0]
                // Setting Month - End
                if (LocalDB) {

                    // Total - Start
                    const total = LocalDB.exec(totalQuery());
                    if (total.length > 0) state.total = convertDbResultToJson(total, "total")?.[0]?.["count(*)"] || 0;
                    else state.total = 0
                    // Total - End

                    // Performance - Start
                    const performance = LocalDB.exec(performanceQuery());
                    if (total.length > 0) {
                        const temp: any = {
                            labels: [],
                            datasets: [
                                {
                                    data: [],
                                    backgroundColor: "#EF884A",
                                    borderColor: "#EF884A",
                                    borderWidth: 1,
                                    borderRadius: 5,
                                },
                            ],
                        };
                        convertDbResultToJson(performance, "performance")?.forEach((x: DataModelOfChartType) => {
                            temp.labels.push(x.name);
                            temp.datasets[0].data.push((x.correct / (x.correct + x.incorrect)) * 100);
                        });
                        state.performance = temp;
                    }
                    else state.performance = {
                        labels: [],
                        datasets: [
                            {
                                data: [],
                                backgroundColor: "#EF884A",
                                borderColor: "#EF884A",
                                borderWidth: 1,
                                borderRadius: 5,
                            },
                        ],
                    }
                    // Performance - End

                    // Performance - Start
                    const avgAccuracy = LocalDB.exec(performanceQuery());
                    if (avgAccuracy.length > 0) {
                        const temp: any = {
                            labels: [],
                            datasets: [
                                {
                                    label: 'Accuracy',
                                    data: [],
                                    backgroundColor: 'rgba(255, 165, 89, 0.5)',
                                    borderColor: 'rgba(255, 165, 89, 1)',
                                    borderWidth: 1,
                                },
                            ],
                        };
                        convertDbResultToJson(avgAccuracy, "avgAccuracy").forEach((x: DataModelOfChartType) => {
                            temp.labels.push(x.name);
                            temp.datasets[0].data.push((x.correct / (x.correct + x.incorrect)) * 100);
                        });
                        state.avgAccuracy = temp;
                    }
                    else state.avgAccuracy = {
                        labels: [],
                        datasets: [
                            {
                                label: 'Accuracy',
                                data: [],
                                backgroundColor: 'rgba(255, 165, 89, 0.5)',
                                borderColor: 'rgba(255, 165, 89, 1)',
                                borderWidth: 1,
                            },
                        ],
                    }
                    // Performance - End


                    // Tmt - Start
                    const tmt = LocalDB.exec(tmtQuery());
                    const colors: any = {
                        0: {
                            backgroundColor: 'rgba(239, 136, 74, 0.5)',
                            borderColor: '#EF884A',
                        },
                        1: {
                            backgroundColor: 'rgba(163, 86, 210, 0.5)',
                            borderColor: '#A356D2',
                        },
                        2: {
                            backgroundColor: 'rgba(60, 139, 188, 0.5)',
                            borderColor: '#3C8DBC',
                        },
                        3: {
                            backgroundColor: 'rgba(92, 184, 92, 0.5)',
                            borderColor: '#5CB85C',
                        },
                        4: {
                            backgroundColor: 'rgba(240, 173, 78, 0.5)',
                            borderColor: '#F0AD4E',
                        },
                    }
                    if (tmt.length > 0) {
                        const temp: any = {
                            labels: [],
                            datasets: [],
                        };
                        const mapped = convertDbResultToJson(tmt, "tmt")
                        mapped.forEach((x: any) => {
                            if (!temp.datasets.some((y: any) => y.label === x.name)) {
                                temp.datasets.push({
                                    label: x.name,
                                    data: [],
                                    borderColor: colors?.[temp?.datasets?.length]?.borderColor,
                                    backgroundColor: colors?.[temp?.datasets?.length]?.backgroundColor,
                                    tension: 0.4,
                                })
                            }
                            if (!temp.labels?.includes(x.week)) temp.labels.push(`Week ${x.week}`)
                        })
                        temp.labels.forEach((x: string) => {
                            temp.datasets.forEach((y: any, i: number) => {
                                const isExist = mapped.find((z: any) => z.name === y.label && x === `Week ${z.week}`)
                                if (!!isExist) {
                                    temp.datasets[i].data.push(isExist.avg)
                                } else {
                                    temp.datasets[i].data.push(0)
                                }
                            })
                        });
                        state.tmt = temp;
                    }
                    else state.tmt = {
                        labels: [],
                        datasets: [],
                    };
                    // Tmt - End


                    // All Months - Start
                    const allMonths = LocalDB.exec(monthsQuery());
                    if (allMonths.length > 0) state.allMonths = convertDbResultToJson(allMonths, "allMonths")?.map((x: { month: string }) => { return { ...x, month: Number(x.month) } });
                    else state.allMonths = []
                    // All Months - End

                    // Setting Month - Start
                    if (!!payload?.payload?.monthSelected && JSON.stringify(payload?.payload?.monthSelected) !== '{}')
                        state.monthSelected = payload?.payload?.monthSelected;
                    else
                        state.monthSelected = state?.allMonths?.[0]
                    // Setting Month - End

                    // Overall Chart - Start
                    const overallData = LocalDB.exec(overallQuery());
                    if (overallData.length > 0) state.overall = convertDbResultToJson(overallData, "overallData");
                    else state.overall = [{ name: 1, correct: 0, incorrect: 0 }, { name: 2, correct: 0, incorrect: 0 }]
                    // Overall Chart - End

                    // Quant Chart - Start
                    const quantData = LocalDB.exec(quantQuery());
                    if (quantData.length > 0) state.quant = convertDbResultToJson(quantData, "quantData");
                    else state.verbal = [{ name: 1, correct: 0, incorrect: 0 }, { name: 2, correct: 0, incorrect: 0 }]
                    // Quant Chart - End

                    // Di Chart - Start
                    const diData = LocalDB.exec(diQuery());
                    if (diData.length > 0) state.di = convertDbResultToJson(diData, "diData");
                    else state.di = [{ name: 1, correct: 0, incorrect: 0 }, { name: 2, correct: 0, incorrect: 0 }]
                    // Di Chart - End

                    // Verbal Chart - Start
                    const verbalData = LocalDB.exec(verbalQuery());
                    if (verbalData.length > 0) state.verbal = convertDbResultToJson(verbalData, "verbalData");
                    else state.quant = [{ name: 1, correct: 0, incorrect: 0 }, { name: 2, correct: 0, incorrect: 0 }]
                    // Verbal Chart - End

                    // Weekly Chart - Start
                    const weeklyData = LocalDB.exec(weekyChartQuery(state?.monthSelected?.month || 0, state?.monthSelected?.year || ""));
                    if (weeklyData.length > 0) state.weekly = convertDbResultToJson(weeklyData, "weeklyData");
                    else state.weekly = [{ name: 1, correct: 0, incorrect: 0 }, { name: 2, correct: 0, incorrect: 0 }]
                    // Weekly Chart - End

                    // Accuracy - Start
                    const accuracyData = LocalDB.exec(accuracyChartQuery(state?.monthSelected?.month || 0, state?.monthSelected?.year || ""));
                    if (accuracyData.length > 0) state.accuracy = convertDbResultToJson(accuracyData, "accuracyData");
                    else state.accuracy = [{ name: "Correct", value: 0 }, { name: "Incorrect", value: 0 }]
                    // Accuracy - End

                    // Category - Start
                    const categoryData = LocalDB.exec(categoryChartQuery(state?.monthSelected?.month || 0, state?.monthSelected?.year || ""));
                    if (categoryData.length > 0) state.categoryAccuracy = convertDbResultToJson(categoryData, "categoryData");
                    else state.categoryAccuracy = [{ name: "Correct", value: 0 }, { name: "Incorrect", value: 0 }]
                    // Category - End

                    // Subcategory - Start
                    const tempSubCategoryAccuracyChartValues: any = {};
                    if (categoryData.length > 0) {
                        state?.categoryAccuracy?.forEach((cat: any) => {
                            const subCategoryData = LocalDB.exec(subCategoryChartQuery(state?.monthSelected?.month || 0, state?.monthSelected?.year || "", cat.name));
                            tempSubCategoryAccuracyChartValues[cat.name] = convertDbResultToJson(subCategoryData, "subCategoryData");
                        })
                        state.subCategoryAccuracy = tempSubCategoryAccuracyChartValues
                    } else state.subCategoryAccuracy = {}
                    // Subcategory - End

                    // Category - Start
                    const lastThreeErrorLogData = LocalDB.exec(lastThreeErrorLogQuery());
                    if (lastThreeErrorLogData.length > 0) state.lastThreeErrorLog = convertDbResultToJson(lastThreeErrorLogData, "lastThreeErrorLogData");
                    else state.lastThreeErrorLog = []
                    // Category - End

                    // Month Accuracy - Start
                    let totalValuePerMonth = 0
                    let totalCorrectValuePerMonth = 0
                    if (overallData.length > 0) state.accuracy.forEach((element: any) => {
                        if (element.name === "Correct") totalCorrectValuePerMonth = element.value
                        totalValuePerMonth += element.value
                    });
                    if (totalCorrectValuePerMonth && totalValuePerMonth)
                        state.monthAccuracy = Number(((totalCorrectValuePerMonth / totalValuePerMonth) * 100).toFixed(2))
                    else state.monthAccuracy = 0
                    // Month Accuracy - End

                } else {
                    state.performance = {
                        labels: [],
                        datasets: [
                            {
                                data: [],
                                backgroundColor: "#EF884A",
                                borderColor: "#EF884A",
                                borderWidth: 1,
                                borderRadius: 5,
                            },
                        ],
                    }
                    state.avgAccuracy = {
                        labels: [],
                        datasets: [
                            {
                                label: 'Accuracy',
                                data: [],
                                backgroundColor: 'rgba(255, 165, 89, 0.5)',
                                borderColor: 'rgba(255, 165, 89, 1)',
                                borderWidth: 1,
                            },
                        ],
                    }
                    state.tmt = {
                        labels: [],
                        datasets: [],
                    };
                    state.overall = []
                    state.verbal = []
                    state.di = []
                    state.quant = []
                    state.weekly = []
                    state.accuracy = []
                    state.categoryAccuracy = []
                    state.subCategoryAccuracy = {}
                    state.lastThreeErrorLog = []
                    state.monthAccuracy = 0
                    state.allMonths = []
                }
            }

        },
        resetChart: (state) => {
            state = { ...initialState }
            return state
        }
    }
});

export const { chartData, resetChart } = ChartDataReducer.actions;
export default ChartDataReducer.reducer;

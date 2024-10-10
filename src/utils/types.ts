export interface DataModelOfChartType {
    name: number | string
    correct: number
    incorrect: number
}

export interface DataModelOfChartAccuracyType {
    name: string
    value: number
}

export interface ChartReduxType {
    total: number
    performance: any
    avgAccuracy: any
    tmt: any
    overall: DataModelOfChartType[]
    verbal: DataModelOfChartType[]
    di: DataModelOfChartType[]
    quant: DataModelOfChartType[]
    weekly: DataModelOfChartType[]
    accuracy: DataModelOfChartAccuracyType[]
    categoryAccuracy: DataModelOfChartAccuracyType[]
    subCategoryAccuracy: { [key: string]: DataModelOfChartAccuracyType[] }
    lastThreeErrorLog: any[]
    monthAccuracy: number
    monthSelected: { year?: string; month?: number }
    isAuthenticated: boolean
    isReveal: boolean
    allMonths: { year: string, month: number }[]
    hasMoreData: boolean;
    lastPageDetails: {
        page: number;
        pageSize: number;
        dataLength: number;
    }
}

export interface ChartReduxPayloadType {
    payload: {
        isLoggedOut: boolean
        isAuthenticated: boolean
        monthSelected: { year: string; month: number }
    }
}

export interface ReduxType {
    chartData: ChartReduxType
}

export interface Notification {
    id: string;
    title: string;
    timestamp: string;
    subject: string;
    subjectCategory: string;
    description: string;
    questionCount: number;
    seen: boolean;
}
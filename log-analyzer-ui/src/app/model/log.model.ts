export class FileSize{
    size: number;
}

export class FileStatus{
    status: string;
}

export class HighlightText{
    fromPosition: number;
    toPosition: number;
}

export class Data{
    datetime: string;
    message: string;
    highlightText: HighlightText[]
}

export class GetDataResponse{
    data: Data[];
    datetimeFrom: string;
    datetimeUntil: string;
    phrase: string
}

export class RequestDataForm{
    datetimeFrom: string;
    datetimeUntil: string;
    phrase: string;
}

export class Histogram{
    datetime: string;
    counts: number
}

export class GetHistogramResponse{
    histogram: Histogram[];
    datetimeFrom: string;
    datetimeUntil: string;
    phrase: string
}

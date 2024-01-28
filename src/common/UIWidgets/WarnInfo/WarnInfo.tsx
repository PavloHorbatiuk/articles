import { Alert, AlertColor } from "@mui/material";
import { SEVERITY } from "common/const/enums";
import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
    severity: SEVERITY;
}

const mapSeverityToAlertColor = (severity: SEVERITY): AlertColor => {
    switch (severity) {
        case SEVERITY.ERROR:
            return "error";
        case SEVERITY.INFO:
            return "info";
        case SEVERITY.SUCCESS:
            return "success";
        case SEVERITY.WARNING:
            return "warning";
        default:
            return "info";
    }
};

const WarnInfo = ({ children, severity = SEVERITY.INFO }: IProps) => {
    return (
        <Alert severity={mapSeverityToAlertColor(severity)}>{children}</Alert>
    );
};

export default WarnInfo;

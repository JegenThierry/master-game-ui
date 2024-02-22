import { TaskType } from "./enums";
import { Task } from "./task";

export const API_URL = "https://localhost:7262/api/";
// export const API_URL = "https://media-intermediary-backend20231230161702.azurewebsites.net/api/";
export const WEBSOCKET_URL = "https://localhost:7262/userHub";
// export const WEBSOCKET_URL = "https://media-intermediary-backend20231230161702.azurewebsites.net/userHub";

export const DEFAULT_NOTIFICATION_TIME = 7000;
export const DEFAULT_ACTIVITIES_AMOUNT = 20;
export const DEFAULT_NOTIFICATION_TIMEOUT = 3000;
export let EXTENSION_ID = "loknmadgbjongejaabdifagnoofgpnki";

export const LOCAL_STORAGE_VARIABLES = {
	userId: "uid",
	activeTaskId: "activeTaskId",
};

export const MarkingTask = new Task(
	1,
	"Marking Task",
	"Mark all text passages you do not understand",
	TaskType.MarkingTask
);

export const OptionLabelsAgreement = [
	"Trifft nicht zu",
	"Trifft eher nicht zu",
	"Weder noch",
	"Trifft eher zu",
	"Trifft zu",
];

export const QuestionnaireGroupIds = {
	FirstQuestionnaire: "q-1-acdf",
	SecondQuestionnaire: "q-2-sdzu",
	ThirdQuestionnaire: "q-3-ynks",
	FinalQuestionnaire: "q-4-kfdh",
};

export const Questionnaires = {
	Demographics: "Demographisches",
	PXI: "PXI",
	Panas: "PANAS",
	Imi_Task: "IMI (Aufgabe)",
	Imi_Game: "IMI (Anwendung)",
	Hexad: "HEXAD",
	SystemUsability: "SUS",
	Final: "Abschluss",
};

export const GlobalEvents = {
	MapLocationLoaded: "MapLocationLoaded",
};

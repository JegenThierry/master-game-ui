export enum TeamId {
	Player = "Player",
	Glitch = "Glitch",
	Neutral = "Neutral",
}

export enum StudyPhase {
	QuestionnaireBeforeBaseline = "QuestionnaireBeforeBaseline",
	Baseline = "Baseline",
	QuestionnaireAfterBaseline = "QuestionnaireAfterBaseline",
	Game = "Game",
	QuestionnaireAfterGame = "QuestionnaireAfterGame",
	Completed = "Completed",
}

export enum AchievementDifficulty {
	Easy = "Easy",
	Medium = "Medium",
	Hard = "Hard",
}

export enum UnlockablesReward {
	MarkerCommon = "MarkerCommon",
	MarkerRare = "MarkerRare",
	MarkerSuperRare = "MarkerSuperRare",
	MarkerRainbow = "MarkerRainbow",
	MarkerGreenPink = "MarkerGreenPink",
}

export enum AchievementType {
	ContributionCount = "ContributionCount",
	ExplorationCount = "ExplorationCount",
	ResourceCountDust = "ResourceCountDust",
	ResourceCountMana = "ResourceCountMana",
	ResourceCountStamina = "ResourceCountStamina",
}

export enum TaskType {
	MarkingTask = "MarkingTask",
	TimingTask = "TimingTask",
	ExploringTask = "ExploringTask",
	RatingTask = "RatingTask",
	SemanticTask = "SemanticTask",
	ScoutingTask = "ScoutingTask",
}

export enum ChromeMessages {
	SetActiveTask = "SetActiveTask",
	GetActiveTask = "GetActiveTask",
	AddTimingTaskEntry = "AddTimingTaskEntry",
	GetTimingTaskData = "GetTimingTaskData",
	GetTimingTaskStartTimestamp = "GetTimingTaskStartTimestamp",
	GetRatingData = "GetRatingData",
	AddRatingData = "AddRatingData",
	AddMarkingTaskEntry = "AddMarkingTaskEntry",
	GetMarkingData = "GetMarkingData",
	RemoveMarkingTaskEntry = "RemoveMarkingTaskEntry",
	SetUser = "SetUser",
	GetUser = "GetUser",
	ResponseSuccess = "ResponseSuccess",
	ResponseFailure = "ResponseFailure",
	GetExtensionId = "GetExtensionId",
	ResetData = "ResetData",
	GetCurrentSemanticTag = "GetCurrentSemanticTag",
	GetSemanticData = "GetSemanticData",
	AddMarkingToSemanticData = "AddMarkingToSemanticData",
	SetActiveTaskByTaskType = "SetActiveTaskByTaskType",
	AddExplorationTaskEntry = "AddExplorationTaskEntry",
	GetExplorationTaskData = "GetExplorationTaskData",
	UpdateResources = "UpdateResources",
}

export enum Icon {
	Home = "Home",
	Info = "Info",
	List = "List",
	Error = "Error",
	Checkmark = "Checkmark",
	Warning = "Warning",
	Gamepad = "Gamepad",
}

export enum Size {
	XS = "XS",
	SM = "SM",
	BASE = "BASE",
	MD = "MD",
	XL = "XL",
	XXL = "XXL",
}

export enum Color {
	Primary = "Primary",
	Accent = "Accent",
	Warn = "Warn",
	Error = "Error",
	Neutral = "Neutral",
	Red = "Red",
	Blue = "Blue",
}

export enum MessageType {
	Alert = "Alert",
	Success = "Success",
	Warning = "Warning",
	Error = "Error",
	Info = "Info",
}

export enum ButtonType {
	Primary = "Primary",
	Secondary = "Secondary",
	Link = "Link",
	Ghost = "Ghost",
	Disabled = "Disabled",
}

export enum MarkingType {
	WellFormulated = "WellFormulated",
	NotUnderstandable = "NotUnderstandable",
}

export enum ResourceTypes {
	ManaPotion = "ManaPotion",
	StaminaPotion = "StaminaPotion",
	PixelDust = "PixelDust",
	Mana = "Mana",
	Stamina = "Stamina",
	Exp = "Exp",
}

export enum ProfileImage {
	None = "None",
	Ant = "Ant",
	Cat = "Cat",
	Dog = "Dog",
	Elephant = "Elephant",
	Owl = "Owl",
	Sloth = "Sloth",
}

export enum ResponseMessageType {
	Achievement = "Achievement",
	Exp = "Exp",
	Mana = "Mana",
	Stamina = "Stamina",
	Unlockable = "Unlockable",
	MileStoneContributions = "MileStoneContributions",
	PixelDust = "PixelDust",
}

export enum NotificationType {
	Agreements = "Agreements",
}

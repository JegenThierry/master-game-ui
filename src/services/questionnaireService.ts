import { API_URL } from "@/models/constants";
import Answer from "@/models/questionnaire/answer";
import QuestionnaireGroup from "@/models/questionnaire/questionnaireGroup";
import axios from "axios";

class QuestionnaireService {
	public async getQuestionnaire(userId: string) {
		let url = `${API_URL}Questionnaire`;
		url += `?userId=${encodeURIComponent(userId)}`;

		const res = await axios.get(url);

		return new QuestionnaireGroup(res.data);
	}

	public async submitAnswers(
		questionnaireGroupId: number,
		questionnaireId: number,
		userId: string,
		answers: Answer[]
	): Promise<string> {
		let url = `${API_URL}Questionnaire`;
		url += `?questionnaireGroupId=${encodeURIComponent(questionnaireGroupId)}`;
		url += `&questionnaireId=${encodeURIComponent(questionnaireId)}`;
		url += `&userId=${encodeURIComponent(userId)}`;

		const res = await axios.post(url, answers);
		return res.data;
	}
}

export default new QuestionnaireService();

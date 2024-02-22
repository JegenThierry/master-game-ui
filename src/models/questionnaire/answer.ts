export default class Answer {
	public question: string = "";
	public answerText: string = "";

	constructor(question: string, answer: string) {
		this.question = question;
		this.answerText = answer;
	}
}

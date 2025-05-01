class Email {
  constructor(subject, from, to, body, priority) {
    this.subject = subject;
    this.from = from;
    this.to = to;
    this.body = body;
    this.priority = priority;
  }
}

export default Email;
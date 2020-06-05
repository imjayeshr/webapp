export class Books {
    constructor(
        public isbn: string,
        public title: string,
        public authors: string,
        public publication_date: Date,
        public price: number,
        public quantity: number
      ) {  }
}

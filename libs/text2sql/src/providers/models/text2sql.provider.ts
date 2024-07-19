export interface TextToSqlProvider {
  generateSql(question: string, schema: string): Promise<string>;
}

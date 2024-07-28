enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Error = 'error',
}

enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}
export { NodeEnv, LogLevel, SortOrder, TransactionStatus };

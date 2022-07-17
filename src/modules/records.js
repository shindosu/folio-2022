const isModelName = (record, model) => record.sys.contentType.sys.id === model;

const singleRecord = (records, model) => records
  .find(record => isModelName(record, model)).fields;

const multipleRecords = (records, model) => records
  .filter(record => isModelName(record, model))
  .map(record => record.fields);

export { singleRecord, multipleRecords };

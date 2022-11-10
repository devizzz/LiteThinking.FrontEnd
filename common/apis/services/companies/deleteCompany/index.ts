import http from '@common/http';

const deleteCompany = async (id: string, NIT: string): Promise<void> =>
  (await http.delete(`${process.env.LITE_THINKING_API}/api/ApiLiteThinking?id=${id}&partitionKey=${NIT}`)).data;

export default deleteCompany;

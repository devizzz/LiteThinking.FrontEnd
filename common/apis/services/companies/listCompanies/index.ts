import { Companies } from '@common/apis/types/companies';
import http from '@common/http';

const getCompanies = async (): Promise<Array<Companies>> =>
  (await http.get(`${process.env.LITE_THINKING_API}/api/ApiLiteThinking`)).data;

export default getCompanies;

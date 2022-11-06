import { Companies } from '@common/apis/types/companies';
import http from '@common/http';

const saveCompanies = async (company: Companies): Promise<Companies> =>
  (await http.post(`${process.env.LITE_THINKING_API}/api/ApiLiteThinking`, company)).data;

export default saveCompanies;

import { Companies } from '@common/apis/types/companies';
import http from '@common/http';

const updateCompanies = async (company: Companies): Promise<void> =>
  (await http.put(`${process.env.LITE_THINKING_API}/api/ApiLiteThinking`, company));

export default updateCompanies;

import http from '@common/http';

const sendEmail = async (email: string | undefined, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('pdf', file);
    (await http.post(`${process.env.LITE_THINKING_API}/api/ApiSendEmail?email=${email}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })).data;
}

export default sendEmail;

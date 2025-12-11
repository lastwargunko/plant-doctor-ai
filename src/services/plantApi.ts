import axios from 'axios';

const API_URL = 'http://localhost:8000';

export interface DetectionResponse {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  symptoms: string[];
  treatment: string[];
}

export const detectPlantDisease = async (imageFile: File): Promise<DetectionResponse> => {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await axios.post<DetectionResponse>(`${API_URL}/detect`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

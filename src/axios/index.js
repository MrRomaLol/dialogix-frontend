import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getData = async (url) => {
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postData = async (url, data) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const putData = async (url, data) => {
    try {
        const response = await axiosInstance.put(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const patchData = async (url, data) => {
    try {
        const response = await axiosInstance.patch(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const uploadFiles = async (url, files, progressCB) => {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append('files', file);
    });
    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: progress => {
                const { total, loaded } = progress;
                const totalSizeInMB = total / 1000000;
                const loadedSizeInMB = loaded / 1000000;
                const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
                progressCB?.({
                    totalSizeInMB,
                    loadedSizeInMB,
                    uploadPercentage: uploadPercentage.toFixed(2),
                });
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteData = async (url, data) => {
    try {
        const response = await axiosInstance.delete(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

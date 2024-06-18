export const getFilePath = (file) => {
    const filePath = file.path;
    const fileReplace = filePath.replace(/\\/g, '/');

    return fileReplace;
};
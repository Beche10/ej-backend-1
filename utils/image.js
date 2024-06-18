export const getFilePath = (file) => {
    const filePath = file.path;
    const fileReplace = filePath.replace(/\\/g, '/');
    //const fileSplit = filePath.split("/");


    return fileReplace;
    //return `${fileSplit[1]} / ${fileSplit[2]}` 
};
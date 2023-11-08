export default function getFileTypeByExtension(fileName) {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    switch (fileExtension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'svg':
        case 'psd':
        case 'svgz':
            return 'image';
        case 'pdf':
            return 'pdf';
        case 'doc':
        case 'docx':
        case 'odt':
        case 'rtf':
            return 'word';
        case 'txt':
        case 'html':
        case 'htm':
        case 'css':
        case 'js':
        case 'json':
        case 'xml':
        case 'jsonld':
        case 'sql':
        case 'log':
            return 'text';
        case 'mp3':
        case 'wav':
        case 'flac':
        case 'aac':
        case 'ogg':
            return 'audio';
        case 'mp4':
        case 'avi':
        case 'mov':
        case 'mkv':
        case 'wmv':
            return 'video';
        case 'zip':
        case 'rar':
        case 'tar':
        case '7z':
            return 'archive';
        case 'xls':
        case 'xlsx':
        case 'csv':
            return 'excel';
        case 'ppt':
        case 'pptx':
            return 'presentation';
        default:
            return 'unknown';
    }
}

const doc1 = document.getElementById("footer-doc1");
const doc2 = document.getElementById("footer-doc2");

export const retrieveDocs = (lang) => {
    doc1.href = `https://taphr.kz/${lang}/privacy_policy`;
    doc1.target = "_blank";

    doc2.href = `https://taphr.kz/${lang}/offer`;
    doc2.target = "_blank";
}
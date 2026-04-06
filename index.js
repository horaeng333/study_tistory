import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 */
let text = `# Hi there 👋 

## 📕 Latest Blog Posts 
`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }
});

(async () => {
    // 피드 목록 가져오기 (본인의 블로그 주소로 꼭 변경하세요!)
    const feed = await parser.parseURL('https://tillidie333.tistory.com/rss'); 
    
    text += `<ul>`;

    // 최신 10개의 글의 제목과 링크를 가져와서 text에 추가
    for (let i = 0; i < 10; i++) {
        const { title, link } = feed.items[i];
        console.log(`${i + 1}번째 게시물: ${title}`);
        text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
    }

    text += `</ul>`;

    // README.md 파일 생성
    writeFileSync('README.md', text, 'utf8');
    console.log('업데이트 완료');
})();
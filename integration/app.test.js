describe('addItemForm', () => {
    it ('base example, visually looks correct', async ()=>{
        //APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?globals=&args=&id=todolist-additemform--add-item-forms-story',
            {waitUntil: "networkidle2"});

        const image = await page.screenshot();

        //APIs from jest-image-snapshot
        expect(image).toMatchSnapshot();
    });
});
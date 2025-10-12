import {test, expect, Page} from "@playwright/test";

const someName = 'Maryam';
const someEmail = 'magmag@gm.com';
const someComment = 'test';

const navigateToForm = async(page: Page) => {
  await page.getByTestId('accept-cookies').click();
  await page.getByRole('link', { name: 'Go to Feedback Form' }).click();
}

const fillForm = async(page: Page) => {
  await page.getByRole('textbox', { name: 'Name (required):' }).fill(someName);
  await page.getByRole('textbox', { name: 'Email (required):' }).fill(someEmail);
  await page.getByRole('textbox', { name: 'Comment (required):' }).fill(someComment);
  await page.getByRole('checkbox', { name: 'I agree to the site\'s Terms' }).check();
}

const clickOnButton = async(page: Page, buttonName: string) => {
  await page.getByRole('button', { name: buttonName }).click();
}

test('Form is submitted with required fields' ,async({page})=>{
    let formSubmitted = false;

    page.on('dialog', dialog => {
        dialog.accept();
        formSubmitted = true;
      });

   await page.goto('http://localhost:5200/');

  await navigateToForm(page);

   await fillForm(page);

   await clickOnButton(page, 'Submit');

   await expect(formSubmitted).toBe(true);
});

test('Form is submitted with required fields >> form is cleared after confirmation' ,async({page})=>{
    page.on('dialog', dialog => {
        dialog.accept();
      });

   await page.goto('http://localhost:5200/');

   await navigateToForm(page);

   await fillForm(page);

   const name = page.getByRole('textbox', { name: 'Name (required):' });


   await clickOnButton(page, 'Submit');

   await expect(name).toHaveValue('');
});

test('Form is not submitted if the user does not enter the minimal required fields' ,async({page})=>{
  let formSubmitted = false;
  page.on('dialog', dialog => {
    dialog.accept();
    formSubmitted = true;
  });

  await page.goto('http://localhost:5200/');

  await navigateToForm(page);

  await fillForm(page);
  await page.getByRole('textbox', { name: 'Email (required):' }).fill('');

  await clickOnButton(page, 'Submit');

  await expect(formSubmitted).toBe(false);

});

test('Form should not be submitted if the user does not confirm the dialog' ,async({page})=>{
  let formSubmitted = false;

  page.on('dialog', dialog => {
      
    if(dialog.message().includes('Do you really want to submit the form?')){
      dialog.dismiss();
      formSubmitted = false;
    }

    else{
      dialog.accept();
      formSubmitted = true;
    }
    });

 await page.goto('http://localhost:5200/');

 await navigateToForm(page);

 await fillForm(page);

 await clickOnButton(page, 'Submit');

 await expect(formSubmitted).toBe(false);
});

test('Form is completed >> clear button should clear the form' ,async({page})=>{
  page.on('dialog', dialog => {
    dialog.accept();
  });

  await page.goto('http://localhost:5200/');

  await navigateToForm(page);

  const name = page.getByRole('textbox', { name: 'Name (required):' });

  await name.fill(someName);

  await clickOnButton(page, 'Save Progress');

  await page.reload();

  await expect(name).toHaveValue(someName);

  await clickOnButton(page, 'Clear Progress');

  await expect(name).toHaveValue('');
});


test('Form is completed >> Clear button should clear the memory' ,async({page})=>{
  page.on('dialog', dialog => {
    dialog.accept();
  });

  await page.goto('http://localhost:5200/');

  await page.evaluate((name) => {
    localStorage.setItem('name', name);
  }, someName);

  await page.reload();

  await navigateToForm(page);

  const name = page.getByRole('textbox', { name: 'Name (required):' });

  await expect(name).toHaveValue(someName);

  await page.getByRole('button', { name: 'Clear Progress' }).click(); 
  
  const storageName = await page.evaluate(() => {
    return localStorage.getItem('name');
  });

  expect(storageName).toBeNull();

  await expect(name).toHaveValue('');
});

test('Form is completed >> Clear button should not clear the memory if the user does not confirm the dialog' ,async({page})=>{
  page.on('dialog', dialog => {
   if(dialog.message().includes('Are you sure you want to clear the form progress? This action cannot be undone.')){
    dialog.dismiss();
   }

   else{
    dialog.accept();
   }
  });

  await page.goto('http://localhost:5200/');

  await navigateToForm(page);

  const name = page.getByRole('textbox', { name: 'Name (required):' });

  await name.fill(someName);

  await clickOnButton(page, 'Save Progress');

  await page.reload();

  await clickOnButton(page, 'Clear Progress');

  await expect(name).toHaveValue(someName);
});




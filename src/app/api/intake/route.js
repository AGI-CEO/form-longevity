export async function POST(req) {
  let formData = JSON.stringify(req.body);
  //console.log(formData);
  let reqPrompt = `Based on this intake form: ${req.formData}, provide a recommendation for the optimal longevity protocol to follow for the user. Format in markdown.`;
  const data = {
    question: req.body.reqPrompt,
  };
  const response = await fetch(
    "https://flowise.seelanglabs.com/api/v1/prediction/baddc5c7-9bdf-4cde-8ccd-6fb4e3022163",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  console.log(result);
  return result;
}

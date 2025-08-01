async function extractUID() {
  const input = document.getElementById('fbLink').value.trim();
  const resultBox = document.getElementById('result');
  const copyBtn = document.getElementById('copyBtn');

  resultBox.textContent = 'Processing...';
  copyBtn.style.display = 'none';

  try {
    const res = await fetch(`/api/get-uid?url=${encodeURIComponent(input)}`);
    const data = await res.json();

    if (data.uid) {
      resultBox.textContent = `UID: ${data.uid}`;
      copyBtn.style.display = 'inline-block';
      copyBtn.setAttribute('data-uid', data.uid);
    } else {
      resultBox.textContent = 'UID not found.';
    }
  } catch (err) {
    resultBox.textContent = 'Error fetching UID.';
  }
}

function copyUID() {
  const uid = document.getElementById('copyBtn').getAttribute('data-uid');
  navigator.clipboard.writeText(uid).then(() => {
    alert("UID copied to clipboard!");
  });
}

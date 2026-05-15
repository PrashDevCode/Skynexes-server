const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  const formData = {
    name: (e.target as any).name.value,
    email: (e.target as any).email.value,
    company: (e.target as any).company.value,
    projectType: (e.target as any).projectType.value,
    budget: (e.target as any).budget.value,
    message: (e.target as any).message.value,
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success) {
      setSubmitted(true);
    } else {
      setError(data.message || 'Something went wrong');
    }
  } catch (err) {
    setError('Failed to submit. Please try again.');
  } finally {
    setLoading(false);
  }
};
fetch('/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'My New Blog Post',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    })
  }).then(response => {
    if (response.ok) {
      console.log('Blog post created successfully!');
    } else {
      console.log('Failed to create blog post.');
    }
  }).catch(error => {
    console.log('Error:', error);
  });
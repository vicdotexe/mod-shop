export const FormImageUpload = async(formData)=>{
    const res = await fetch('http://localhost:3001/images', {
        method: 'POST',
        body: formData
    });
    const data = await res.json();
    return data.secure_url;
}


function incrementProgressBar(time, progress_bar){
    progress_bar.value = 0;
    progress_bar.max = 100;
    let intervalId = setInterval(function() {
        progress_bar.value += 10 / time;

        if (progress_bar.value >= 100){
            clearInterval(intervalId)}
    }, 100);
}


function fillOptions(select_form, options){
    options.forEach(i=> {
        const option_element = document.createElement('option');
        option_element.value = i.address;
        option_element.innerText = `${i.name} (${i.address})`;
        select_form.appendChild(option_element);
    });
}
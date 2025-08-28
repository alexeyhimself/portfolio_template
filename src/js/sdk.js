function update_navbar(data) {
  let content = '';
  for (let i = 0; i < data.length; i++) {
    const menu_item_text = Object.keys(data[i])[0];
    const menu_item_id = menu_item_text.toLowerCase();
    content +=  '<li class="nav-item">';
      content += `<a class="nav-link" aria-current="page" href="#${menu_item_id}">${menu_item_text}</a>`;
    content += '</li>';
  }
  document.getElementsByClassName('navbar-nav')[0].innerHTML = content;
}

function compose_section_beginning(section_type) {
  let content =  `<div class="row" id="${section_type.toLowerCase()}">`;
        content += `<div class="col-lg-3"><h3>${section_type}</h3></div>`;
  return content;
}
function compose_section_end() {
  return '</div>';
}

function update_about(data, section_type) {
  let content = compose_section_beginning(section_type);
  content += `<div class="col-lg"><p>${data.section_data}</p></div>`;
  content += compose_section_end();
  return content;
}

function update_contacts(data, section_type) {
  let content = compose_section_beginning(section_type);
  content += '<div class="col-lg"><p>';
  for (let j = 0; j < data.section_data.length; j++)
    content += `<b>${data.section_data[j].label}:</b> <a href="${data.section_data[j].link}" target="_blank" rel="external">${data.section_data[j].display_text}</a><br>`;
  content += '</p></div>';
  content += compose_section_end();
  return content;
}

function compose_project_li(data) {
  content = '<li class="li">';
  content += `<p class="li_header"><b>`;
  if (data.link)
    content += `“<a href="${data.link}" target="_blank">${data.name}</a>” &mdash; ${data.header} `;
  else
    content += `“${data.name}” &mdash; ${data.header} `;
  //let pretty_link = data.link.replace(/(^\w+:|^)\/\//, '');  // romove protocol
  //    pretty_link = pretty_link.replace(/\/.*/, '');  // remove everything after hostname
  //content += `<a href="${data.link}" target="_blank">${pretty_link}</a>`;
  content += '</b></p>';

  if (data.description) {
    const description = data.description.split('\n');
    if (description.length > 1) {
      content += '<ul>';
      description.forEach((paragraph) => {
        content += `<li class="li_paragraph">${paragraph}</li>`;
      });
      content += '</ul>';
    }
    else {
      content += `<p class="li_paragraph">${description[0]}</p>`;
    }
  }

  content += '<div style="display: flex; flex-wrap: wrap;">';

  if (data.videos) {
    data.videos.forEach((video) => {
      content += `<iframe class="img-thumbnail" width="42%" height="auto" src="${video.link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    });
  }

  if (data.images) {
    for (let i = 0; i < data.images.length; i++) {
      const img = data.images[i];
      if (!img.link)
        continue;

      content += '<a href="#" data-bs-toggle="modal" data-bs-target="#image_preview_modal">';
      content += `<img src="${img.link}" class="img-thumbnail" alt="${img.description}">`;
      content += '</a>';
    }
  }

  content += '</div>';

  content += '</li>';
  return content;
}

function compose_conference_li(data) {
  content = '<li class="li">';
  content += `<p class="li_header"><b>${data.title} ${data.conference}</b></p>`;
  content += `<iframe class="img-thumbnail" width="50%" height="auto" src="${data.link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  content += '</li>';
  return content;
}

function compose_interview_li(data) {
  content = '<li class="li">';
  content += `<p class="li_header"><a href="${data.link}" target="_blank">${data.title}</a></p>`;
  content += '</li>';
  return content;
}

function update_projects(data, section_type) {
  let content = compose_section_beginning(section_type);
  content += '<div class="col-lg">';
  content += `<p>${data.section_explanatory_text}</p>`;
  content += '<ul>';
  for (let j = 0; j < data.section_data.length; j++)
    content += compose_project_li(data.section_data[j]);
  content += '</ul>';
  content += '</div>';
  content += compose_section_end();
  return content;
}

function update_conferences(data, section_type) {
  let content = compose_section_beginning(section_type);
  content += '<div class="col-lg">';
  content += '<ul>';
  for (let j = 0; j < data.length; j++)
    content += compose_conference_li(data[j]);
  
  content += '</ul>';
  content += '</div>';
  content += compose_section_end();
  return content;
}

function update_interviews(data, section_type) {
  let content = compose_section_beginning(section_type);
  content += '<div class="col-lg">';
  content += '<ul>';
  for (let j = 0; j < data.length; j++)
    content += compose_interview_li(data[j]);
  
  content += '</ul>';
  content += '</div>';
  content += compose_section_end();
  return content;
}

function update_books(data, section_type) {
  let content = compose_section_beginning(section_type);
  content += '<div class="col-lg">';
  content += '<ul>';
  for (let j = 0; j < data.length; j++)
    content += compose_project_li(data[j]);
  
  content += '</ul>';
  content += '</div>';
  content += compose_section_end();
  return content;
}

function update_sections(data) {
  let function_to_call;
  let content = '';
  for (let i = 0; i < data.length; i++) {
    const section_type = Object.keys(data[i])[0];
    const section_type_lower_case = section_type.toLowerCase();
    if (section_type_lower_case == 'contacts')
      function_to_call = update_contacts;
    else if (section_type_lower_case == 'about')
      function_to_call = update_about;
    else if (section_type_lower_case == 'products')
      function_to_call = update_projects;
    else if (section_type_lower_case == 'conferences')
      function_to_call = update_conferences;
    else if (section_type_lower_case == 'interviews')
      function_to_call = update_interviews;
    else if (section_type_lower_case == 'books')
      function_to_call = update_books;
    else
      continue;

    content += function_to_call(data[i][section_type], section_type);
  }
  document.getElementById('sections').innerHTML = content;
}

function update_element(data, locator) {
  const elements = document.getElementsByClassName(locator);
  for (let i = 0; i < elements.length; i++)
    elements[i].innerHTML = data;
}

function update_title(data) {
  document.title = `Portfolio of ${data}`;
}
function update_meta_description(data) {
  document.getElementsByTagName('meta')["description"].content = `${data}`;
}
function update_meta_keywords(data) {
  document.getElementsByTagName('meta')["keywords"].content = `${data}`;
}

function run_post_fetch_routines(data) {
  update_title(data.full_name);
  update_meta_description(data.meta_description);
  update_meta_keywords(data.meta_keywords);

  update_element(data.full_name, 'full-name');
  update_element(data.pitch, 'pitch');
  update_navbar(data.sections);
  update_sections(data.sections);

  document.getElementsByTagName('body')[0].style.display = '';  // when rendering complete, display the page
}

window.onload = function() {
  //fetch('https://togetherisbetter.github.io/portfolio/data/data.json')
  fetch('data/data.json')
    .then((response) => response.json())
    .then((data) => {
      run_post_fetch_routines(data);
    })
    .catch((error) => {
      console.warn('data.json file is not available, fallback to data.sample.json file');

      fetch('data/data.sample.json')
        .then((response) => response.json())
        .then((data) => {
          run_post_fetch_routines(data);
        })
        .catch((error) => {
          console.warn('data.sample.json file is not available, fallback to data.sample.json file hosted by GitHub');

          fetch('https://raw.githubusercontent.com/alexeyhimself/portfolio_template/main/data/data.sample.json')
            .then((response) => response.json())
            .then((data) => {
              run_post_fetch_routines(data);
            })
            .catch((error) => {
              alert("Can't read neither your data.json nor data.sample.json files. Make sure they are available and have correct JSON format.");
            })
        })
    })

  const image_preview_modal = document.getElementById('image_preview_modal')
  if (image_preview_modal) {
    image_preview_modal.addEventListener('show.bs.modal', event => {
      const img = event.relatedTarget.children[0];

      const img_src = img.getAttribute('src');
      document.getElementById('image_preview').setAttribute('src', img_src);   
      const img_alt = img.getAttribute('alt');
      document.getElementById('image_preview_modalLabel').innerHTML = img_alt;
    });
  }
};
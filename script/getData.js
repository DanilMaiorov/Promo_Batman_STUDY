const ratings = document.querySelectorAll('.rating')
console.log(ratings);
if(ratings.length > 0) {
    initRatings()
}

function initRatings () {
    let ratingActive
    let ratingValue
    ratings.forEach(item => {
        initRating(item)
    })
    //инициализируем конкретный рейтинг
    function initRating (rating) {
        initRatingLets(rating)
        setRatingActiveWidth()

        if(rating.classList.contains('rating_set')) {
            setRating(rating)
        }
    }
    //инициализация переменных
    function initRatingLets (rating) {
        ratingActive = rating.querySelector('.rating__active')
        ratingValue = rating.querySelector('.rating__value')
    }
    //изменение ширины активных звезд
    function setRatingActiveWidth (index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.1
        ratingActive.style.width = `${ratingActiveWidth}%`
    }
    //возможность указать рейтинг
    function setRating (rating) {
        const ratingItems = rating.querySelectorAll('.rating__item')
        ratingItems.forEach((item, index) => {
            item.addEventListener('mouseenter', (e) => {
                //обновление переменных
                initRatingLets(rating)
                //обновление активных звезд
                setRatingActiveWidth(item.value)
            })
            item.addEventListener('mouseleave', (e) => {
                setRatingActiveWidth()
            })
            item.addEventListener('click', (e) => {
                initRatingLets(rating)
                if(rating.dataset.ajax) {
                    setRatingValue(item.value, rating)
                } else {
                    ratingValue.innerHTML = index + 1
                    setRatingActiveWidth ()
                }
            })
        })
    }

async function setRatingValue(value, rating) {
    if(!rating.classList.contains('rating__sending')) {
        rating.classList.add('rating__sending')
    }
    //отправка на сервер
    let response = await fetch('./db/rating-json.json', {
        method: 'GET',
/*         body: JSON.stringify({
            userRating: value
        }), 
        headers: {
            'content-type':'application/json'
        } */
    })
        if(response.ok) {
            const result = await response.json()
            //получаем новый рейтинг
            const newRating = result.newRating
            //вывод нового рейтинга
            ratingValue.innerHTML = newRating

            //обновление активных звезд
            setRatingActiveWidth()

            rating.classList.remove('rating__sending')
        } else {
            alert('Ошибка')

            rating.classList.remove('rating__sending')
        }
    }
}
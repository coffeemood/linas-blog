import Prismic from 'prismic-javascript';

const repository = 'https://linas-blog.prismic.io/api/v2';

export const fetchSingle = (id) => (
    new Promise (resolve => {
        Prismic.api(repository).then(api => {
            api.getSingle(id).then((doc) => { console.log(doc); resolve(doc) })
        }
    )}
  )    
)

export const fetchTag = (type, tags) => (
    new Promise (resolve => {
        Prismic.api(repository).then(api => {
            api.query(Prismic.Predicates.at(type, tags)).then((result) => {
                resolve(result);
            })
        })
    })
)
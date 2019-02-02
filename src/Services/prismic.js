import Prismic from 'prismic-javascript';

const repository = 'https://linas-blog.prismic.io/api/v2';

export const fetchSingle = (id) => (
    new Promise (resolve => {
        Prismic.api(repository).then(api => {
            api.getSingle(id).then((doc) => { resolve(doc) })
        }
    )}
  )    
)

export const fetchUID = (tag, uid) => (
    new Promise (resolve => {
        console.log({tag, uid})
        Prismic.api(repository).then(api => {
            api.getByUID(tag, uid).then((doc) => { resolve(doc) }) 
        })
    })
)

export const fetchQuery = (queries) => (
    new Promise (resolve => {
        const q = queries.map(query => Prismic.Predicates.at(query[0], query[1]))
        Prismic.api(repository).then(api => {
            api.query(q).then((doc) => {
                resolve(doc);
            })
        })
    })
)
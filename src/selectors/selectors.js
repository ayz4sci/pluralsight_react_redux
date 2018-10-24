export const authorsFormattedForDropDown = (authors) => ( 
    authors.map( author => ({
            value: author.id,
            text: author.firstName + " " + author.lastName
        })
    )
)
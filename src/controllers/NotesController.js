const knex = require("../database/knex")

class NotesController {
  async create(request, response) {
    const { title, description, notes_tags, notes_links } = request.body
    const { user_id } = request.params

    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id
    })

    const linksInsert = notes_links.map(link => {
      return {
        note_id,
        url: link
      }
    })

    await knex("notes_links").insert(linksInsert)

    const tagsInsert = notes_tags.map(name => {
      return {
        note_id,
        name,
        user_id,
      }
    })

    await knex("notes_tags").insert(tagsInsert)

    response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const note = await knex("notes").where({ id }).first()
    const notes_tags = await knex("notes_tags").where({ note_id: id }).orderBy("name")
    const notes_links = await knex("notes_links").where({ note_id: id }).orderBy("created_at")

    return response.json({
      ...note,
      notes_tags,
      notes_links
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("notes").where({ id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { title, user_id } = request.query
    const notes = await knex("notes").where({ user_id }).whereLike("title", `%${title}%`).orderBy("title")

    return response.json(notes)
  }

}

module.exports = NotesController
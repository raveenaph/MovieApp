import { error } from "console"
import { ObjectId } from "bson"
import e from "express"

let reviews;

export default class ReviewsDAO {

    static async injectDB(conn) {
        if (reviews) {
          return
        }
        try {
          reviews = await conn.db("movies").collection("reviews");
        } catch (e) {
          console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }


    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review,
            }
            console.log(`Movieid: ${movieId}, user: ${user}, Review: ${review}` );
            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return {error: e}
        }
    }
    
    static async getReview(reviewId) {
        try {
          return await reviews.findOne({ _id: new ObjectId(reviewId) })
        } catch (e) {
          console.error(`Unable to get review: ${e}`)
          return { error: e }
        }
    }
    
    static async updateReview(reviewId, user, review) {
        console.log("rev", reviewId)
        try {
            const updateResponse = await reviews.updateOne(
                {_id: new ObjectId(reviewId)},
                {$set: {user: user, review: review}}
            )
    
            return updateResponse
        } catch (e){
            console.error(`Unable to get review: ${e}`)
            return {error: e}
        }
    }
    
    static async deleteReview(reviewId) {
        console.log("review id: ", reviewId);

        try {
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(reviewId),
            })
    
            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return {error: e}
        }
    }
    
    static async getReviewsByMovieId(movieId) {
        try {
            const cursor = await reviews.find({movieId: parseInt(movieId)})
            return cursor.toArray()
        } catch (e) {
            console.error(`Unable to get review: ${e}`)
            return {error: e}
        }
    }
    
    
    
}

from flask import jsonify, make_response
from google.cloud import language_v1
from google.cloud import storage

def main(request):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Requested-With'
    }
    if request.method == 'OPTIONS':
        return make_response('', 204, headers)
        
    request_json = request.get_json(silent=True)
    if request_json is None:
        return make_response(jsonify({"error": "No JSON payload received."}), 400, headers)

    if 'title' not in request_json:
        return make_response(jsonify({"error": "Argument 'title' required."}), 400, headers)

    title = request_json['title']

    # pull reviews from the database with 'title'
    # for each review, run it through analyze()
    # returns a json object with a 'score' attribute from [-1, 1]
    movie_dict = download_blob("movie-reviews-data", "cs1660dataset1(Sheet1).csv")

    total = 0
    #print("testing movie: " + str(title))
    if title in movie_dict:
        for review in movie_dict[title]:
            score = analyze(review)
            #print("score for review: " + str(score) + ": " + review)
            total += score
    else:
        # return jsonify({"success": False, "error": "Movie not found."}), 200  
        return make_response(jsonify({"success": False, "error": "Movie not found."}), 200, headers)


    #print("average score: " + str(total / len(movie_dict[title])))
    # return jsonify({"success": True, "score": total / len(movie_dict[title])}), 200
    return make_response(jsonify({"success": True, "score": total / len(movie_dict[title])}), 200, headers)


def analyze(content):
	client = language_v1.LanguageServiceClient()
	document = language_v1.Document(content=content, type_=language_v1.Document.Type.PLAIN_TEXT)
	annotations = client.analyze_sentiment(request={"document": document})

	return annotations.document_sentiment.score

def download_blob(bucket_name, blob_name):
    print("DOWNLOADING BLOB")
    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)

    blob = bucket.blob(blob_name)
    contents = blob.download_as_bytes()

    print("BYTES RECEIVED:")
    print(contents)
    text_contents = contents.decode('latin1')
    
    print("CONTENT RECEIVED:")
    print(text_contents)

    return parse_reviews(text_contents)

    #for movie, reviews in movie_dict.items():
    #    print(f"Movie: {movie}")
    #    for review in reviews:
    #        print(f"  Review: {review}")
    #    print("\n")

def parse_reviews(text):
    lines = text.strip().split('\n')[1:]
    reviews_dict = {}
    for line in lines:
        if ',' not in line:
            continue
        title, review = line.split(',', 1)
        if title in reviews_dict:
            reviews_dict[title].append(review.strip())
        else:
            reviews_dict[title] = [review.strip()]
    return reviews_dict

# uhhhhhhhh

from flask import Flask, session, redirect, url_for, render_template, request, flash, jsonify
from google.cloud import language_v1

app = Flask(__name__)
app.config['SECRET_KEY'] = "this is a bad secret key!"

def analyze():
	client = language_v1.LanguageServiceClient()

	content = """
			"Barbie" is to feminism as a wrench is to a cat. Extermination of rational thought is this commercial's goal. Toxic. "Barbie" is a chunky diarrhea stain on humanity. Greta Gerwig is a hack screenwriter, and a remedial filmmaker at best."""

	document = language_v1.Document(content=content, type_=language_v1.Document.Type.PLAIN_TEXT)
	annotations = client.analyze_sentiment(request={"document": document})

	# Print the results
	print(annotations)

@app.route('/')
def index():
	# render main page
	analyze()
	pass

if __name__ == '__main__':
	app.run(debug=True)
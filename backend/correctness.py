from transformers import pipeline
classifier = pipeline("zero-shot-classification",
                      model="facebook/bart-large-mnli")

sequence_to_classify = "colloquial?. used in casual converations"
candidate_labels = ['correct', 'incorrect', 'neither']
classifier(sequence_to_classify, candidate_labels)
print(classifier(sequence_to_classify, candidate_labels))

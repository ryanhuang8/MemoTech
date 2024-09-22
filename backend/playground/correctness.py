from transformers import pipeline

def assess_correctness(question, answer):
    classifier = pipeline("zero-shot-classification",
                        model="facebook/bart-large-mnli")

    sequence_to_classify = f"saying {question} is the same as saying {answer}."
    candidate_labels = ['yes', 'no', 'neither']
    return classifier(sequence_to_classify, candidate_labels)

print(assess_correctness('use in casual conversation','use in formal conversation'))

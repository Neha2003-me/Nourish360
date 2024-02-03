import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import random

# List of tasks
tasks = [
    "Coordinate event logistics",
    "Manage volunteer teams",
    "Create event marketing materials",
    "Handle sponsorships and fundraising",
    "Organize venue setup and decoration",
    "Manage technology and audio-visual support",
    "Analyze event data for insights",
    "Plan and execute participant engagement activities",
    "Coordinate transportation for the event",
    "Deliver speeches and engage with the audience",
    "Lead and inspire a team",
    "Collaborate with team members",
    "Troubleshoot problems during the event",
    "Design innovative event materials",
    "Create social media content",
    "Execute fundraising initiatives",
    "Plan and organize various aspects of the event",
    "Manage public relations",
    "Craft engaging communication materials",
    "Set up and manage technology components for the event",
    "Coordinate and oversee event projects",
    "Recruit, train, and coordinate volunteers",
    "Manage social media accounts",
    "Analyze and solve challenges during the event",
    "Create visually appealing graphics",
    "Execute marketing strategies",
    "Plan and execute participant engagement activities",
    "Coordinate transportation for the event",
    "Deliver speeches and engage with the audience",
    "Design innovative event materials"
]

# List of skills
skills = [
    "Leadership",
    "Communication",
    "Teamwork",
    "Problem-Solving",
    "Creativity",
    "Event Planning",
    "Logistics Management",
    "Volunteer Coordination",
    "Sponsorship and Fundraising",
    "Public Speaking"
]

# Generate a dataset with combinations of skills and tasks
num_entries = 1000
data = {
    'Skill_1': random.choices(skills, k=num_entries),
    'Skill_2': random.choices(skills, k=num_entries),
    'Skill_3': random.choices(skills, k=num_entries),
    'Skill_4': random.choices(skills, k=num_entries),
    'Task_1': random.choices(tasks, k=num_entries),
    'Task_2': random.choices(tasks, k=num_entries)
}

df = pd.DataFrame(data)

# Combine skills and tasks as text
df['Text'] = (
    df['Task_1'] + ', ' + df['Task_2'] + ', ' +
    df['Skill_1'] + ', ' + df['Skill_2'] + ', ' +
    df['Skill_3'] + ', ' + df['Skill_4']
)

# Vectorize the text data
vectorizer = CountVectorizer()
text_matrix = vectorizer.fit_transform(df['Text'])

# Train a Multinomial Naive Bayes classifier
classifier = MultinomialNB()
classifier.fit(text_matrix, df['Task_1'])

# Make predictions on the entire dataset
predictions = classifier.predict(text_matrix)

# Evaluate the model
accuracy = (df['Task_1'] == predictions).mean()
print(f'Model Accuracy: {accuracy:.2%}')

# Save the dataset to a CSV file
df.to_csv('tasks_skills_dataset.csv', index=False)

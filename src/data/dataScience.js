// Every number here comes from the notebooks and result files in each repository.

const VIOLET = '#6D5BD0';
const CYAN = '#1FA9C1';
const SLATE = '#8A93A6';
const INK = '#14213D';

const dataScience = [
  {
    slug: 'map-matching',
    title: 'Map matching and next-road prediction in Munich',
    context: 'MSc research with TUM drone data and OpenStreetMap',
    summary:
      'GPS points rarely sit on the road a car is actually driving on. I tested whether giving a neural network what OpenStreetMap knows about each road (type, speed limit, lanes, one-way, bridge, tunnel, junction) helps it pick the right road when GPS is noisy and sparse.',
    approach: [
      'Converted 214,997 drone-tracked car positions (309 trips) to real-world coordinates and matched them to the Munich road network pulled with OSMnx.',
      'Split data by trip, not by row, so no journey appears in both training and test sets.',
      'Simulated 24 GPS conditions (0–50 m noise, 1–10 s sampling) and compared nearest-road, an HMM/Viterbi matcher and two LSTMs that differ only in whether they see road semantics.',
    ],
    results: [
      { value: '24 / 24', label: 'conditions where road semantics improved the LSTM' },
      { value: '+3.5 pts', label: 'average accuracy gain, Wilcoxon p < 0.001' },
      { value: '19.0 m', label: 'lowest positional error at 20 m GPS noise' },
    ],
    tech: ['Python', 'TensorFlow/Keras', 'OSMnx', 'NetworkX', 'pyproj', 'SciPy', 'scikit-learn'],
    github: 'https://github.com/KLightiam/AI-Driven-Map-Matching-and-Next-Road-Segment-Prediction',
    charts: [
      {
        tab: 'Accuracy',
        type: 'line',
        title: 'Map-matching accuracy as GPS noise grows',
        xLabel: 'GPS noise (m)',
        yLabel: 'Accuracy',
        x: [0, 5, 10, 20, 30, 50],
        yDomain: [0, 1],
        format: 'pct',
        series: [
          { name: 'Semantic LSTM', color: VIOLET, values: [0.656, 0.642, 0.619, 0.547, 0.443, 0.26] },
          { name: 'Geometry-only LSTM', color: CYAN, values: [0.632, 0.616, 0.587, 0.5, 0.399, 0.226] },
          { name: 'HMM / Viterbi', color: INK, dash: '5 4', values: [0.75, 0.702, 0.643, 0.517, 0.382, 0.21] },
          { name: 'Nearest road', color: SLATE, dash: '2 4', values: [1, 0.9, 0.8, 0.624, 0.47, 0.26] },
        ],
        caption:
          'Averaged over the four sampling intervals. The semantic LSTM beats its geometry-only twin at every noise level. Nearest road scores 100% at 0 m only because the ground-truth labels were built the same way from the clean drone positions.',
      },
      {
        tab: 'Error',
        type: 'line',
        title: 'Mean distance from the true road',
        xLabel: 'GPS noise (m)',
        yLabel: 'Error (m)',
        x: [0, 5, 10, 20, 30, 50],
        yDomain: [0, 70],
        format: 'm',
        series: [
          { name: 'Semantic LSTM', color: VIOLET, values: [10.3, 10.8, 12.7, 19.0, 29.2, 56.6] },
          { name: 'Geometry-only LSTM', color: CYAN, values: [10.4, 11.8, 14.6, 22.1, 32.3, 59.5] },
          { name: 'HMM / Viterbi', color: INK, dash: '5 4', values: [4.0, 8.1, 12.6, 22.2, 34.8, 62.8] },
          { name: 'Nearest road', color: SLATE, dash: '2 4', values: [0, 6.4, 12.4, 24.2, 37.3, 64.9] },
        ],
        caption:
          'From 20 m of noise upwards, the semantic LSTM puts its answer closest to the true road of all four methods.',
      },
      {
        tab: 'Ablation',
        type: 'bars',
        title: 'Validation accuracy with one group of road attributes removed',
        domain: [0.8, 0.86],
        format: 'pct1',
        rows: [
          { label: 'All attributes', value: 0.849, highlight: true },
          { label: 'Without road type and lanes', value: 0.842 },
          { label: 'Without speed limit', value: 0.836 },
          { label: 'Without one-way, bridge, tunnel, junction', value: 0.827 },
        ],
        caption:
          'Each group was zeroed out and the model retrained. Losing the road flags costs the most accuracy (2.2 points).',
      },
      {
        tab: 'Next road',
        type: 'grouped',
        title: 'Predicting the next road segment (162 test steps)',
        domain: [0, 1],
        format: 'pct',
        metrics: [
          { key: 'markov', name: 'Markov baseline', color: VIOLET },
          { key: 'rnn', name: 'RNN with road embeddings', color: CYAN },
        ],
        rows: [
          { label: 'Top-1 accuracy', markov: 0.654, rnn: 0.395 },
          { label: 'Top-3 accuracy', markov: 0.957, rnn: 0.741 },
          { label: 'Top-5 accuracy', markov: 0.975, rnn: 0.833 },
          { label: 'Mean reciprocal rank', markov: 0.804, rnn: 0.552 },
        ],
        caption:
          'The simple Markov model won. With trips averaging under five road segments, there was too little sequence data for the RNN to learn more than transition counts already capture.',
      },
    ],
    figures: [
      {
        src: './ds/munich-trajectories.webp',
        caption: 'Raw drone tracks along the study corridor: cars in colour, pedestrians, cyclists and other road users in grey.',
      },
    ],
  },
  {
    slug: 'spam',
    title: 'YouTube spam detection: classical NLP vs. transformers',
    context: 'NLP on the UCI YouTube Spam Collection',
    summary:
      'Spam comments with malicious links reach children watching harmless videos. I compared cheap classical text classifiers with fine-tuned transformers to see how much accuracy the extra compute actually buys.',
    approach: [
      'Cleaned and deduplicated 1,956 comments, replacing URLs with a token so links still count as a spam signal.',
      'Tested bag-of-words and TF-IDF variants with Linear SVC, Logistic Regression and Naïve Bayes.',
      'Fine-tuned DistilBERT and DeBERTa with the Hugging Face Trainer, early stopping and F1-based model selection.',
    ],
    results: [
      { value: '0.975', label: 'F1 with DeBERTa' },
      { value: '0.95', label: 'F1 with Linear SVC on a CPU' },
      { value: '2 tiers', label: 'recommended: SVC for volume, DeBERTa for high-risk channels' },
    ],
    tech: ['Python', 'scikit-learn', 'PyTorch', 'Hugging Face', 'NLTK'],
    github: 'https://github.com/KLightiam/youtube-spam-detection',
    charts: [
      {
        tab: 'F1 by model',
        type: 'bars',
        title: 'F1 score on the held-out test set',
        domain: [0.85, 1],
        format: 'dec3',
        rows: [
          { label: 'Naïve Bayes (bag of words)', value: 0.92 },
          { label: 'Logistic Regression', value: 0.94 },
          { label: 'Linear SVC (TF-IDF)', value: 0.95 },
          { label: 'DistilBERT', value: 0.959 },
          { label: 'DeBERTa', value: 0.975, highlight: true },
        ],
        caption: 'Transformers add about 2.5 points of F1 over the best classical model, at the cost of GPU training and inference.',
      },
      {
        tab: 'Linear SVC errors',
        type: 'confusion',
        title: 'Linear SVC confusion matrix (388 test comments)',
        labels: ['Not spam', 'Spam'],
        matrix: [
          [183, 7],
          [12, 186],
        ],
        caption: 'Seven genuine comments flagged as spam, twelve spam comments missed.',
      },
    ],
    figures: [
      { src: './ds/spam-length.webp', caption: 'Comment length by class: spam comments run longer.' },
    ],
  },
  {
    slug: 'occupancy',
    title: 'Room occupancy from sensor data',
    context: 'Time-series deep learning on UCI sensor data',
    summary:
      'Heating and lighting empty rooms wastes energy. I built an LSTM that tells whether a room is occupied from temperature, humidity, light and CO₂ readings, without cameras.',
    approach: [
      'Split 20,562 readings in time order (80/10/10) and fitted scaling on the training period only, so no future data leaks into training.',
      'Fed 30-step sliding windows into a two-layer LSTM with dropout and early stopping.',
      'Logged nine tuning runs covering sequence length, batch size, learning rate, dropout and batch normalisation.',
    ],
    results: [
      { value: '0.99', label: 'accuracy and F1 on 2,028 test windows' },
      { value: '12', label: 'misclassified windows in total' },
      { value: '9', label: 'documented tuning experiments' },
    ],
    tech: ['Python', 'TensorFlow/Keras', 'Pandas', 'scikit-learn'],
    github: 'https://github.com/KLightiam/occupancy-detection',
    charts: [
      {
        tab: 'Test results',
        type: 'confusion',
        title: 'Confusion matrix on the test period',
        labels: ['Empty', 'Occupied'],
        matrix: [
          [1475, 7],
          [5, 541],
        ],
        caption: 'Only 12 of 2,028 windows were misclassified.',
      },
      {
        tab: 'Tuning runs',
        type: 'bars',
        title: 'Validation accuracy across tuning runs',
        domain: [0.7, 1],
        format: 'pct1',
        rows: [
          { label: 'Base model', value: 0.9699 },
          { label: 'Batch size 32', value: 0.9625 },
          { label: 'Sequence length 20', value: 0.9917 },
          { label: 'Learning rate 0.005', value: 0.7282 },
          { label: 'Sequence 10, batch 32', value: 0.73 },
          { label: 'No batch normalisation', value: 0.9941, highlight: true },
          { label: 'No dropout', value: 0.9896 },
          { label: 'First LSTM 32 units', value: 0.9904 },
          { label: 'Second LSTM 16 units', value: 0.9941 },
        ],
        caption:
          'A higher learning rate and very short windows hurt badly. Removing batch normalisation gave the best validation loss and was kept.',
      },
    ],
    figures: [{ src: './ds/occupancy-loss.webp', caption: 'Training and validation loss for the final model.' }],
  },
  {
    slug: 'magic',
    title: 'Gamma rays or hadrons? Comparing classifiers',
    context: 'Classification on the UCI MAGIC Gamma Telescope data',
    summary:
      'Cherenkov telescopes record flashes from both gamma rays and background cosmic rays. I compared five model families on 19,020 events to see which separates them best.',
    approach: [
      'Standardised the 10 image features and rebalanced the training set (8,650 vs. 4,664) with random oversampling.',
      'Trained KNN, Gaussian Naïve Bayes, Logistic Regression and SVM as baselines.',
      'Grid-searched a feedforward network over 36 combinations of width, dropout, learning rate and batch size.',
    ],
    results: [
      { value: '0.87', label: 'accuracy with the tuned neural network' },
      { value: '0.86', label: 'macro F1, ahead of SVM at 0.84' },
      { value: '36', label: 'network configurations searched' },
    ],
    tech: ['Python', 'scikit-learn', 'imbalanced-learn', 'TensorFlow/Keras', 'Seaborn'],
    github: 'https://github.com/KLightiam/magic-gamma-data-modeling',
    charts: [
      {
        tab: 'Model comparison',
        type: 'grouped',
        title: 'Test-set results across 2,853 events',
        domain: [0.5, 0.9],
        format: 'dec2',
        metrics: [
          { key: 'acc', name: 'Accuracy', color: VIOLET },
          { key: 'f1', name: 'Macro F1', color: CYAN },
        ],
        rows: [
          { label: 'Gaussian Naïve Bayes', acc: 0.72, f1: 0.65 },
          { label: 'Logistic Regression', acc: 0.78, f1: 0.76 },
          { label: 'K-nearest neighbours', acc: 0.82, f1: 0.8 },
          { label: 'SVM', acc: 0.86, f1: 0.84 },
          { label: 'Neural network', acc: 0.87, f1: 0.86 },
        ],
        caption: 'Macro F1 is the fairer score here because hadrons are the minority class in the test set.',
      },
    ],
    figures: [
      { src: './ds/magic-falpha.webp', caption: 'fAlpha, the shower angle, differs clearly between the two classes.' },
      { src: './ds/magic-flength.webp', caption: 'fLength overlaps much more between gamma and hadron events.' },
    ],
  },
  {
    slug: 'job-search',
    title: 'What gets students a job offer?',
    context: 'Exploratory analysis of 100,000 student records',
    summary:
      'For a university careers fair, I analysed how platform choice, internships and grades relate to job offers, salaries and time to offer.',
    approach: [
      'Profiled 100,000 records across 20 features and found 65,771 blanks were not errors: they mark students with no offer, so I kept them instead of imputing.',
      'Compared offer rates, salaries, time to offer and applications needed across Handshake, LinkedIn and Indeed.',
      'Grouped GPA into bands and traced offer rate by number of internships.',
    ],
    results: [
      { value: '23% → 73%', label: 'offer rate from no internships to five' },
      { value: '34 vs. 93', label: 'applications per offer on Handshake vs. Indeed' },
      { value: '29 days', label: 'fastest time to offer, on Indeed' },
    ],
    tech: ['Python', 'Pandas', 'Seaborn', 'Plotly', 'Matplotlib'],
    github: 'https://github.com/KLightiam/job-search-data-analysis',
    charts: [
      {
        tab: 'Internships',
        type: 'line',
        title: 'Share of students receiving an offer',
        xLabel: 'Prior internships',
        yLabel: 'Offer rate',
        x: [0, 1, 2, 3, 4, 5],
        yDomain: [0, 0.8],
        format: 'pct',
        series: [{ name: 'Offer rate', color: VIOLET, values: [0.232, 0.323, 0.41, 0.518, 0.614, 0.733] }],
        caption: 'Each extra internship adds roughly 10 points to the offer rate. This is correlation, not proof of cause.',
      },
      {
        tab: 'Platforms',
        type: 'table',
        title: 'How the three platforms compare',
        columns: ['Platform', 'Offer rate', 'Avg. salary', 'Days to offer', 'Applications per offer'],
        rows: [
          ['Handshake', '37%', '$72,830', '39', '34'],
          ['LinkedIn', '37%', '$84,000', '59', '57'],
          ['Indeed', '26%', '$68,360', '29', '93'],
        ],
        caption: 'LinkedIn offers pay most, Indeed offers arrive fastest, and Handshake needs the fewest applications.',
      },
    ],
    figures: [
      { src: './ds/jobs-salary.webp', caption: 'Offer salary by platform.' },
      { src: './ds/jobs-correlation.webp', caption: 'Correlation between the numeric features.' },
    ],
  },
];

export default dataScience;

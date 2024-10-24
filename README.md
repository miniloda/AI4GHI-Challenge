# AI4GHI Challenge
This repository is a project submitted to the [AI4GHI Challenge 2024](https://docs.google.com/document/d/15pR_djH-cDg0AA55n_iLQuZQrKnluwcAru-CkHLjwUc/edit).

## Team
- Miguel Angelo Bondad
- Jacob Maximus Usaraga
- Mario Dimapilis

## Project
The project is all about trying to integrate AI into predicting mosquito-borne disease **Dengue** in Iloilo City, Philippines.
### Why only a specific place?
Due to the lack of time and data, we decided to focus on a specific place to make sure that we can provide a good model for the specific place. We chose Iloilo City because it is a place where we are familiar with.

## Objective

## Methodology

## End Product

## Data
### For Dengue
The data used in this project is from DOH and OpenDengue. They are all in the `data` folder. We will only be using the data gathered from HDX since it gives us the spatial data of the Dengue cases in Iloilo City.

#### Dengue Data Structure
| Column Name | Description                                             | Type    |
|-------------|---------------------------------------------------------|---------|
| `date`      | Date of the Dengue case                                 | Date    |
| `loc`       | Location of the Dengue case (Specific Province or City) | String  |
| `cases`     | Number of Dengue cases                                  | Integer |
| `deaths`    | Number of Dengue deaths                                 | Integer |
| `Region`    | Region of the Dengue case (e.g. Region VI, VIII)        | String  |
| `Year`      | Year of the Dengue case                                 | Integer |
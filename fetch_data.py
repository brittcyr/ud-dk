import logging
import subprocess
import json
import time


def fetch_all_players(url = 'https://stats.underdogfantasy.com/v1/slates/f659a9be-fd34-4a1e-9c43-0816267e603d/players'):
    cmd = 'curl ' + '\"' + url + '\"'
    logging.debug('Fetching: %s', cmd)
    try:
        page = subprocess.check_output(cmd, shell=True, stderr=subprocess.DEVNULL)
    except:
        return None
    parsed = json.loads(page)

    players = parsed["players"]
    return players

    # List of these
    # {
    #"country": null,
    #"first_name": "Elijah",
    #"id": "a1761b62-9000-4680-b0de-8c54d2ee4473",
    #"image_url": "https://assets.underdogfantasy.com/player-images/nfl/13ade86a-20c7-48fe-9d18-b3bfc135f5e9.png",
    #"last_name": "McGuire",
    #"position_id": "e2571131-7600-5bc9-878b-946a992c8203",
    #"sport_id": "NFL",
    #"team_id": null
    #}

def fetch_all_appearances(
        url='https://stats.underdogfantasy.com/v1/slates/f659a9be-fd34-4a1e-9c43-0816267e603d/scoring_types/ccf300b0-9197-5951-bd96-cba84ad71e86/appearances'):
    cmd = 'curl ' + '\"' + url + '\"'
    logging.debug('Fetching: %s', cmd)
    try:
        page = subprocess.check_output(cmd, shell=True, stderr=subprocess.DEVNULL)
    except:
        return None
    parsed = json.loads(page)
    appearances = parsed["appearances"]

    # List of these
    #        {
    #        "id": "fa2fcc47-5a09-458e-82b6-656b030ad88a",
    #        "latest_news_item_updated_at": "2021-09-12T20:20:25Z",
    #        "lineup_status_id": null,
    #        "match_id": 85,
    #        "match_type": "Season",
    #        "player_id": "8b9ad544-0e96-4b38-9b59-c293e3aadf39",
    #        "position_id": "e2571131-7600-5bc9-878b-946a992c8203",
    #        "projection": {
    #            "adp": "1.2",
    #            "id": 1,
    #            "points": "383.1",
    #            "position_rank": "RB1",
    #            "scoring_type_id": "ccf300b0-9197-5951-bd96-cba84ad71e86"
    #        },
    #        "score": null,
    #        "team_id": "f11f1cf1-9933-5203-8181-95020ee64399"
    #    },

    return appearances

def fetch_all_matches(url='https://stats.underdogfantasy.com/v1/slates/f659a9be-fd34-4a1e-9c43-0816267e603d/matches'):
    cmd = 'curl ' + '\"' + url + '\"'
    logging.debug('Fetching: %s', cmd)
    try:
        page = subprocess.check_output(cmd, shell=True, stderr=subprocess.DEVNULL)
    except:
        return None
    parsed = json.loads(page)
    matches = parsed["matches"]
    # List of these
    # {"id":85,"bye_weeks":[{"id":1047845276,"team_id":"8459772c-695a-5890-afa1-7ec38da17201","week":13,"year":2022}
    return matches

def fetch_all_teams(url='https://stats.underdogfantasy.com/v1/teams'):
    cmd = 'curl ' + '\"' + url + '\"'
    logging.debug('Fetching: %s', cmd)
    try:
        page = subprocess.check_output(cmd, shell=True, stderr=subprocess.DEVNULL)
    except:
        return None
    parsed = json.loads(page)
    teams = parsed["teams"]
    # List of these
    # {"id":"17f3bc4a-e2d6-5dc5-a554-00549ff0139f","abbr":"CAR","name":"Carolina Panthers","primary_color_dark_mode":"#0085CA","primary_color_light_mode":"#0085CA","secondary_color_dark_mode":"#BFC0BF","secondary_color_light_mode":"#1B1B1B","sport_id":"NFL"}
    return teams

def fetch_appearance(player_id):
    url='https://stats.underdogfantasy.com/v1/scoring_types/ccf300b0-9197-5951-bd96-cba84ad71e86/appearances/%s' % (player_id)
    cmd = 'curl ' + '\"' + url + '\"'
    logging.info('Fetching player: %s', cmd)
    try:
        page = subprocess.check_output(cmd, shell=True, stderr=subprocess.DEVNULL)
        time.sleep(1)
    except:
        return None
    parsed = json.loads(page)
    appearance = parsed["appearance"]
    return appearance

def augment_players_with_appearance(players, appearances):
    result = []
    teams = fetch_all_teams()
    matches = fetch_all_matches()

    for player in players:
        for appearance in appearances:
            if player["id"] == appearance["player_id"]:
                player_appearance = fetch_appearance(appearance["id"])
                result.append(player | appearance | player_appearance)
                result[-1]["id"] = appearance["id"]
                result[-1]["appearance_id"] = appearance["id"]
                result[-1]["is_queued"] = "0"

                for team in teams:
                    if team["id"] == result[-1]["team_id"]:
                        result[-1]["team_name"] = team["abbr"]

                for match in matches[0]["bye_weeks"]:
                    if match["team_id"] == result[-1]["team_id"]:
                        result[-1]["bye"] = match["week"]

                if "position_rank" not in result[-1]["projection"] or not result[-1]["projection"]["position_rank"]:
                    position = 'WR'
                else:
                    position = result[-1]["projection"]["position_rank"][0:2]

                if position not in ['RB', 'WR', 'QB', 'TE']:
                    position = 'WR'

                result[-1]["position"] = position
                result[-1]["draft_pick"] = "-1"
                result[-1]["displayed"] = "1"
                break
    return sorted(result, key= lambda x: 1000 if x["projection"]["adp"] == "-"  or not x["projection"]["adp"] else float(x["projection"]["adp"]))


if __name__ == "__main__":
    logging.basicConfig(
        format='%(asctime)s.%(msecs)03d  %(levelname)-8s [%(filename)s:%(lineno)d] %(message)s',
        datefmt='%m/%d/%Y %I:%M:%S',
        level=logging.INFO)

    all_players = fetch_all_players()
    all_appearances = fetch_all_appearances()
    result = augment_players_with_appearance(all_players, all_appearances)
    print(len(result))
    with open("all_players_and_appearances.json", "w") as f:
        json.dump({"result": result}, f, indent=4)

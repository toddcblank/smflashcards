const request = require('request-promise')
const cheerio = require('cheerio')
const Promise = require('bluebird')
const async = require('async')

const rooms = []

function getImageAndTitle(body) {
	$ = cheerio.load(body);
	title = $('h1[class=firstHeading]').find('span').text()
	image = 'http://deanyd.net' + $('a[class=image]').children().attr('src')
	
	return [title, image]
}


function getLinks() {
	return request('http://deanyd.net/sm/index.php?title=List_of_Rooms').then(function(body) {
		$ = cheerio.load(body)
		links = $('li').find('a')
		return links
	})
}

function getGoodLinks() {
	return getLinks().then(function(links){
		let goodLinks = []
		for (var i = 0; i < links.length; i++) {
			link = 'http://deanyd.net' + links[i].attribs.href
			if (link.indexOf('#') == -1) {
				if (link.indexOf('signup') != -1) {
					break;
				}
				goodLinks.push(link)			
			}
		}
		return goodLinks
	});
}


function fetchData(url) {
	return request(url)
}

results = {}
numEmpty = -1

getGoodLinks().then(
	function(links) {	
		// links.forEach((item) => {console.log(item)})

		callback = function(err, results) {}
		async.eachSeries(links, function(link, callback) {
			request(link).then((body) => {
				imageAndTitle = getImageAndTitle(body);
				console.log(imageAndTitle)
				callback();
				// results[link] = imageAndTitle
				// numEmpty--
				// console.log(numEmpty + " to go")
			})
		})
		
})


// request('http://deanyd.net/sm/index.php?title=Ridley_Tank_Room', function(error, response, body) {
// 	info = getImageAndTitle(body)
// 	console.log(info)
// });


// request('http://deanyd.net/sm/index.php?title=Landing_Site', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Crateria_Tube', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Parlor_and_Alcatraz', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Climb', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Pit_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Flyway', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Pre', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Crateria_Map_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=The_Final_Missile', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Final_Missile_Bombway', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Bomb_Torizo_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Terminator_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Green_Pirates_Shaft', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Lower_Mushrooms', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Crateria_Keyhunter_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Statues_Hallway', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Statues_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Crateria_Power_Bomb_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Crateria_Super_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Gauntlet_Entrance', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Gauntlet_Energy_Tank_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=West_Ocean', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Bowling_Alley_Path', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=East_Ocean', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Forgotten_Highway_Kago_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Crab_Maze', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Morph_Ball_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Construction_Zone', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=First_Missile_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Blue_Brinstar_Energy_Tank_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Blue_Brinstar_Boulder_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Blue_Brinstar_Double_Missile_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Green_Brinstar_Main_Shaft', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Early_Supers_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Brinstar_Reserve_Tank_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Brinstar_Pre', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Brinstar_Map_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Green_Brinstar_Fireflea_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Green_Brinstar_Beetom_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Etecoon_Energy_Tank_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Etecoon_Super_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Etecoon_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Green_Hill_Zone', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Noob_Bridge', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Spore_Spawn_Keyhunter_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Spore_Spawn_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Dachora_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Big_Pink', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Pink_Brinstar_Power_Bomb_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Pink_Brinstar_Hopper_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Hopper_Energy_Tank_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Spore_Spawn_Super_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Spore_Spawn_Farming_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Waterway_Energy_Tank_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Red_Tower', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Red_Brinstar_Fireflea_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=X', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Bat_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Below_Spazer', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Spazer_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=West_Tunnel', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=East_Tunnel', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Hellway', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Caterpillar_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Alpha_Power_Bomb_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Beta_Power_Bomb_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Warehouse_Entrance', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Warehouse_Zeela_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Warehouse_Energy_Tank_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Warehouse_Keyhunter_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Baby_Kraid_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Kraid_Eye_Door_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Kraid_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Varia_Suit_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Business_Center', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Norfair_Map_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Hi_Jump_Energy_Tank_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Hi_Jump_Boots_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Cathedral_Entrance', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Cathedral', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Rising_Tide', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Frog_Speedway', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Upper_Norfair_Farming_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Purple_Shaft', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Purple_Farming_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Bubble_Mountain', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Green_Bubbles_Missile_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Norfair_Reserve_Tank_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Bat_Cave', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Speed_Booster_Hall', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Speed_Booster_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Single_Chamber', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Double_Chamber', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Wave_Beam_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Ice_Beam_Gate_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Ice_Beam_Acid_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Ice_Beam_Snake_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Ice_Beam_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Ice_Beam_Tutorial_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Crumble_Shaft', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Spiky_Acid_Snakes_Tunnel', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Kronic_Boost_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Magdollite_Tunnel', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Lava_Dive_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Volcano_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Spiky_Platforms_Tunnel', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Red_Pirate_Shaft', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Acid_Snakes_Tunnel', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Crocomire_Speedway', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Crocomire_Escape', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Crocomire', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Post_Crocomire_Farming_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Post_Crocomire_Power_Bomb_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Post_Crocomire_Shaft', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Post_Crocomire_Missile_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Post_Crocomire_Jump_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Grapple_Beam_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Grapple_Tutorial_Room_1', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Grapple_Tutorial_Room_2', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Grapple_Tutorial_Room_3', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Main_Hall', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Fast_Pillars_Setup_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Pillar_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=The_Worst_Room_In_The_Game', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Amphitheatre', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Red_Keyhunter_Shaft', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Wasteland', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Metal_Pirates_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Plowerhouse_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Lower_Norfair_Farming_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Ridley', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Ridley_Tank_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Mickey_Mouse_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Lower_Norfair_Fireflea_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Lower_Norfair_Spring_Ball_Maze_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Lower_Norfair_Escape_Power_Bomb_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Three_Muskateers', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Acid_Statue_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Golden_Torizo', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Screw_Attack_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Fast_Ripper_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Wrecked_Ship_Entrance', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Wrecked_Ship_Main_Shaft', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Basement', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Wrecked_Ship_Map_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Phantoon', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Wrecked_Ship_West_Super_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Attic', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Bowling_Alley', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Gravity_Suit_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Wrecked_Ship_East_Super_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Sponge_Bath', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Spiky_Death_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Electric_Death_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Wrecked_Ship_Energy_Tank_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Wrecked_Ship_East_Missile_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Glass_Tunnel', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Main_Street', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Fish_Tank', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Mt', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Crab_Shaft', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Crab_Tunnel', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Red_Fish_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Mama_Turtle_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Pseudo_Plasma_Spark_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Northwest_Maridia_Bug_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Watering_Hole', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Aqueduct', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Botwoon_Hallway', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Botwoon', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Botwoon_Energy_Tank_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Halfie_Climb_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Colosseum', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=The_Precious_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Draygon', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Space_Jump_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Cactus_Alley', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Plasma_Spark_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Oasis', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=West_Sand_Hall', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Crab_Hole', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Maridia_Map_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Below_Botwoon_Energy_Tank', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=East_Sand_Hole', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=West_Sand_Hole', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=East_Sand_Hall', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Bug_Sand_Hole', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Butterfly_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Thread_The_Needle_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Maridia_Elevator_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Plasma_Climb', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Plasma_Tutorial_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Plasma_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Pants_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Shaktool_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Spring_Ball_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Tourian_First_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Metroid_Room_1', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Metroid_Room_2', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Metroid_Room_3', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Metroid_Room_4', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Blue_Hopper_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Dust_Torizo_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Big_Boy_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Seaweed_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Tourian_Recharge_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Tourian_Eye_Door_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Rinka_Shaft', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Mother_Brain_Room', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Tourian_Escape_Room_1', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Tourian_Escape_Room_2', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Tourian_Escape_Room_3', function(error, response, body) {return getImageAndTitle(body)});
// request('http://deanyd.net/sm/index.php?title=Tourian_Escape_Room_4', function(error, response, body) {return getImageAndTitle(body)});



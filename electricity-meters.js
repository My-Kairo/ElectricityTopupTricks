// this is our
module.exports = function(pool) {

	// list all the streets the we have on records
	async function streetMeters(streetId) {
		const street = await pool.query(`select * from street where balance, meter_number = '${streetId}'`)
		return street.rows;
	}

	// return all the appliances
	async function appliances() {
		const appl = await pool.query(`select * from appliance`);
		return appl.rows;
	}

	// increase the meter balance for the meterId supplied
	async function topupElectricity(meterId, units) {
		const top = await pool.query('update')
	}

	// increase the meter balance for the meterId supplied
	function topupElectricity(meterId, units) {

	}
	
	// return the data for a given balance
	function meterData(meterId) {
	
	}

	// decrease the meter balance for the meterId supplied
	function useElectricity(meterId, units) {
	
	}

	return {
		streets,
		streetMeters,
		appliances,
		topupElectricity,
		meterData,
		useElectricity
	}


}
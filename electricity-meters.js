// this is our
module.exports = function(pool) {

	// list all the streets the we have on records
	async function streets() {
		const streets = await pool.query(`select * from street`);
		return streets.rows;
	}
	
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
		const sql = await pool.query('select * from electricity_meter', [meterId]);
		if (sql.rows.length == 0){
			await pool.query('update electricity_meter set balance = balance + 50 where meter_number = $1', [units])

		}
	}
	
	// return the data for a given balance
	async function meterData(meterId) {
	const meter = await pool.query('select * from electricity_meter where balance = $1', [meterId]);
	return meter.rows[0];
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
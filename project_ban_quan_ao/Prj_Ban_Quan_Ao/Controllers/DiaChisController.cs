using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prj_Ban_Quan_Ao.Models;

namespace Prj_Ban_Quan_Ao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiaChisController : ControllerBase
    {
        private readonly DbQuanAoContext _context;

        public DiaChisController(DbQuanAoContext context)
        {
            _context = context;
        }

        // GET: api/DiaChis
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DiaChi>>> GetDiaChis()
        {
            return await _context.DiaChis.ToListAsync();
        }

        // GET: api/DiaChis/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DiaChi>> GetDiaChi(Guid id)
        {
            var diaChi = await _context.DiaChis.FindAsync(id);

            if (diaChi == null)
            {
                return NotFound();
            }

            return diaChi;
        }

        [HttpGet("listdiachitheouser/{idAccount}")]
        public IActionResult ListDiaChiTheoUser(string idAccount)
        {
            var query =
                        (from dc in _context.DiaChis
                         where dc.AccountId.ToString() == idAccount
                         orderby dc.NgayTao
                         select
                         dc);
            return Ok(query.ToList());
        }

        // PUT: api/DiaChis/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDiaChi(Guid id, DiaChi diaChi)
        {
            if (id != diaChi.Id)
            {
                return BadRequest();
            }

            _context.Entry(diaChi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiaChiExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DiaChis
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DiaChi>> PostDiaChi(DiaChi diaChi)
        {
            _context.DiaChis.Add(diaChi);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDiaChi", new { id = diaChi.Id }, diaChi);
        }

        // DELETE: api/DiaChis/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiaChi(Guid id)
        {
            var diaChi = await _context.DiaChis.FindAsync(id);
            if (diaChi == null)
            {
                return NotFound();
            }

            _context.DiaChis.Remove(diaChi);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DiaChiExists(Guid id)
        {
            return _context.DiaChis.Any(e => e.Id == id);
        }
    }
}

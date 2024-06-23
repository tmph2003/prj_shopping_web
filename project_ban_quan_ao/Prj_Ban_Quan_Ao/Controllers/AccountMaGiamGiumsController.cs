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
    public class AccountMaGiamGiumsController : ControllerBase
    {
        private readonly DbQuanAoContext _context;

        public AccountMaGiamGiumsController(DbQuanAoContext context)
        {
            _context = context;
        }

        // GET: api/AccountMaGiamGiums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccountMaGiamGium>>> GetAccountMaGiamGia()
        {
            return await _context.AccountMaGiamGia.ToListAsync();
        }

        [HttpGet("getmagiamgiabyaccount/{idAccount}")]
        public IActionResult GetMaGiamGiaByAccount(Guid idAccount)
        {
            var query =
                        (from am in _context.AccountMaGiamGia
                         where am.AccountId == idAccount
                         join mgg in _context.MaGiamGia on am.MagiamgiaId equals mgg.Id
                         select mgg);
            return Ok(query);
        }

        [HttpDelete("xoaaccountmagiamgia/{idAccount}/{idMaGiamGia}")]
        public IActionResult XoaAccountMaGiamGia(string idAccount, string idMaGiamGia)
        {
            var accountMaGiamGium = (from am in _context.AccountMaGiamGia
                                    where am.AccountId.ToString() == idAccount && am.MagiamgiaId.ToString() == idMaGiamGia
                                    select am)
                                    .FirstOrDefault();
            if (accountMaGiamGium == null)
            {
                return NotFound();
            }

            _context.AccountMaGiamGia.Remove(accountMaGiamGium);
            _context.SaveChangesAsync();
            return Ok(NoContent());
        }

        // GET: api/AccountMaGiamGiums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AccountMaGiamGium>> GetAccountMaGiamGium(Guid id)
        {
            var accountMaGiamGium = await _context.AccountMaGiamGia.FindAsync(id);

            if (accountMaGiamGium == null)
            {
                return NotFound();
            }

            return accountMaGiamGium;
        }

        // PUT: api/AccountMaGiamGiums/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccountMaGiamGium(Guid id, AccountMaGiamGium accountMaGiamGium)
        {
            if (id != accountMaGiamGium.Id)
            {
                return BadRequest();
            }

            _context.Entry(accountMaGiamGium).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountMaGiamGiumExists(id))
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

        // POST: api/AccountMaGiamGiums
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AccountMaGiamGium>> PostAccountMaGiamGium(AccountMaGiamGium accountMaGiamGium)
        {
            _context.AccountMaGiamGia.Add(accountMaGiamGium);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccountMaGiamGium", new { id = accountMaGiamGium.Id }, accountMaGiamGium);
        }

        // DELETE: api/AccountMaGiamGiums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccountMaGiamGium(Guid id)
        {
            var accountMaGiamGium = await _context.AccountMaGiamGia.FindAsync(id);
            if (accountMaGiamGium == null)
            {
                return NotFound();
            }

            _context.AccountMaGiamGia.Remove(accountMaGiamGium);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountMaGiamGiumExists(Guid id)
        {
            return _context.AccountMaGiamGia.Any(e => e.Id == id);
        }
    }
}
